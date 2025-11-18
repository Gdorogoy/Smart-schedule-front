import axios from 'axios'


const fetchAll=async()=>{
    try{
        const res= await axios.get('http://localhost:3000/',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            }
        );

        const data = res.data.json();
        return data;
        
    }catch(err){
        console.error(err);
    }
}


export default{
    fetchAll
}