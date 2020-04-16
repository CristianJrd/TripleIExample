import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import './dashboard.css'
import arraySort from 'array-sort'
import gql from 'graphql-tag';
import {Subscription} from 'react-apollo';
import addBook from '../../services/Mutations/addBook';
import getBooks from '../../services/Queries/getBooks';

const NEW_BOOK_ADDED = gql`
subscription{
    newBookAdded{
      title
      numberVol
      room
      bookcase
      position
    }
  }
`;

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            books: "",
            title: "",
            volume: 0,
            room:"",
            bookcase:"",
            position: 0,
            showModal: false,
            lastTitle: "",
            lastVol: ""
         }
    }

    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value

        this.setState(
            {[name]:value}
        )
    }

    componentDidMount(){
        getBooks().then((resp) => {
            //console.log(resp.data.data.getBooks)
            
            this.setState({
                books: resp.data.data.getBooks
            })
        }).catch((err) => {
            console.log(err);
            this.setState({ showModalError: true })
        })
    }

    saveBook = (e) => {
        e.preventDefault()
    
        addBook(this.state).then(response => {
            this.setState({ showModal: true })
        }).catch( err => {
            console.log("Error al agregar el libro")
        })
    }

    handleCloseModal = () => { this.setState({ showModal: false}) }

    getData = () => {
        if(this.state.books !== "" && this.state.books !== undefined && this.state.books !== null){
            if(this.state.books[0] != null){

                let result = arraySort(this.state.books, ['title'])
                this.setState({
                    books: result
                });

                let book = this.state.books.map((data, key) => {
                    return(
                        <tr key={key}>
                            <td>{data.title}</td>
                            <td>{data.volume}</td>
                            <td>{data.room}</td>
                            <td>{data.bookcase}</td>
                            <td>{data.position}</td>
                        </tr>
                        )
                })
                return book;
            } else {
                return(
                    <tr>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <td><h3 className="text-white">La lista esta vacía</h3></td>
                        <td></td>
                        <td></td>
                    </tr>
                    )
            }
        }else{
            return(
                <tr>
                    <th scope="row"></th>
                    <th scope="row"></th>
                    <td><h3 className="text-white">Cargando...</h3></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }
    }

    render() { 
        return ( 
            <div className="container-fluid color_body">
                <div className="row justify-content-center">
                    <div className="card col-md-6 mt-5 mb-3">
                        <div className="card-header text-center">
                            <h4 className="text-dark">Registro de libros</h4>
                        </div>
                        <div className="card-body">
                            <label>Título del libro: </label>
                            <input className="form-control" type="text" name="title" id="title" value={this.state.title} onChange={this.onInputCheck} placeholder="Título del libro" required/>
                            <br/>
                            <label>Volumen: </label>
                            <input className="form-control" type="number" name="volume" id="volume" value={this.state.volume} onChange={this.onInputCheck} required/>
                            <br/>
                            <label>Sala: </label>
                            <input className="form-control" type="text" name="room" id="room" value={this.state.room} onChange={this.onInputCheck} required/>
                            <br/>
                            <label>Librero: </label>
                            <input className="form-control" type="text" name="bookcase" id="bookcase" value={this.state.bookcase} onChange={this.onInputCheck} required/>
                            <br/>
                            <label>Posición: </label>
                            <input className="form-control" type="number" name="position" id="position" value={this.state.position} onChange={this.onInputCheck} required/>
                            <br/>
                            <div className="col-md-12 text-center">
                                <button className="btn btn-secondary" onClick={e => this.saveBook(e)}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-sm-10 col-md-11 mt-5 table-responsive form-group text-center">
                    <table className="table table-light">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Volumen</th>
                                    <th scope="col">Sala</th>
                                    <th scope="col">Librero</th>
                                    <th scope="col">Posición</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getData()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ReactModal className="modal_main_reporthome"
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    onRequestClose={this.handleCloseModal}
                    contentLabel="Minimal Modal Example"
                    >
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-12 text-center">
                                <br/><h3 className="text-center">Libro Agregado Exitosamente</h3><br/>
                                <button className="btn btn-success mb-2" onClick={this.handleCloseModal}>Aceptar</button><br/>
                            </div>
                        </div>
                    </div>
                </ReactModal>
                <Subscription 
                    subscription={NEW_BOOK_ADDED}
                    >
                    {
                        ({data, loading}) => {
                        if(loading) return <React.Fragment></React.Fragment>
                        console.log(data)
                        if (data.newBookAdded.title != this.state.lastTitle && data.newBookAdded.volume != this.state.lastVol){
                            let book = { title: data.newBookAdded.title, volume: data.newBookAdded.volume, position: data.newBookAdded.position, room: data.newBookAdded.room, bookcase: data.newBookAdded.bookcase }
                            this.state.books.push(book)
                            this.setState({ 
                                lastTitle: data.newBookAdded.title, 
                                lastVol: data.newBookAdded.volume,
                                title: "",
                                volume: 0,
                                room: "",
                                bookcase: "",
                                position: 0
                            })
                        }
                        return <React.Fragment></React.Fragment>
                        }
                    }
                </Subscription>
            </div>
         );
    }
}
 
export default Dashboard;