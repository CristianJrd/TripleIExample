import axios from 'axios';
import constante from '../../components/Constante/constante';

export default () => {

    return axios({
        url:constante.url+'graphql',
        method:'post',
        data:{
            query:`
                query{
                    getBooks{
                        _id,
                        numberVol,
                        title,
                        room,
                        bookcase,
                        position
                    }
                }
            `
        }
    })
}