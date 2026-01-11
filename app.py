from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reembolso.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Despesa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(100), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='Pendente')

    def to_dict(self):
        return {
            'id': self.id,
            'descricao': self.descricao,
            'valor': self.valor,
            'categoria': self.categoria,
            'status': self.status
        }


@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/api/adicionar', methods=['POST'])
def adicionar_despesa():
    dados = request.json

    nova_despesa = Despesa(
        descricao=dados['descricao'],
        valor=float(dados['valor']),
        categoria=dados['categoria']
    )

    db.session.add(nova_despesa)
    db.session.commit()

    return jsonify({'mensagem': 'Despesa salva com sucesso!'})


@app.route('/api/listar', methods=['GET'])
def listar_despesas():
    todas_despesas = Despesa.query.all()

    lista_json = [despesa.to_dict() for despesa in todas_despesas]
    return jsonify(lista_json)


@app.route('/api/atualizar/<int:id_despesa>', methods=['POST'])
def atualizar_status(id_despesa):
    dados = request.json

    despesa = Despesa.query.get(id_despesa)

    if despesa:
        despesa.status = dados['status']
        db.session.commit()
        return jsonify({'mensagem': 'Status atualizado!'})

    return jsonify({'erro': 'Despesa não encontrada'}), 404


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
