
import { Component } from "react";

class GitUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaRepositorio: [10],
            nomeRepositorio: ''
        }
    }
    buscarRepositorio = (item) => {
        item.preventDefault();

        console.log("O repositório está sendo buscado")

        fetch('https://api.github.com/users/' + this.state.nomeRepositorio + '/repos?per_page=10&sort=author-date-desc')

            .then(resposta => resposta.json())

            .then(lista => this.setState({ listaRepositorio: lista }))

            .catch(erro => console.log(erro))
    }

    atualizarNome = async (nome) => {
        await this.setState({ nomeRepositorio: nome.target.value })
        console.log(this.state.nomeRepositorio)
    }

    render() {
        return (
            <div className="App">
                <main className="App">
                    <section className="App-header">
                        <h2>Busque os Usuários do GitHub</h2>
                        <form onSubmit={this.buscarRepositorio}>
                            <div>
                                <input
                                    type="text"
                                    value={this.state.nomeRepositorio}
                                    onChange={this.atualizarNome}
                                    placeholder="Usuário do GitHub"
                                />
                                <button type="submit" onClick={this.buscarRepositorio}> Buscar </button>
                            </div>
                        </form>
                    </section>
                    <section className="App-header">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOME</th>
                                    <th>DESCRIÇÃO</th>
                                    <th>DATA CRIAÇÃO</th>
                                    <th>TAMANHO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listaRepositorio.map((repositorio) => {
                                    return (
                                        <tr key={repositorio.id}>
                                            <td>{repositorio.id}</td>
                                            <td>{repositorio.name}</td>
                                            <td>{repositorio.description}</td>
                                            <td>{repositorio.created_at}</td>
                                            <td>{repositorio.size}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        )
    }
}

export default GitUsuario;
