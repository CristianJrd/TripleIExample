import axios from 'axios';
import constantes from '../../components/Constante/constante';

export default (data) => {
     console.log(data);
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                    addBook(
                        title:"${data.title}",
                        numberVol:"${data.volume}",
                        room:"${data.room}",
                        bookcase:"${data.bookcase}",
                        position:"${data.position}"
                    ){
                        title
                    }
                }
            `
        }
    })/*
    return axios.post(constantes.url+"updateDevice/",data)*/
}