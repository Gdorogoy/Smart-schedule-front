import axios from "axios";
export const sendRequest = async (method, url, data, token, refreshToken) => {
    try {
        const res = await axios({
            method,
            url,
            data,
            headers: { Authorization: `Bearer ${token}` },
        });

        return { data: res.data };

    } catch (err) {
        if (err.response?.status === 403) {
            const newToken = await refreshTokenFunc(refreshToken);

            const retry = await axios({
                method,
                url,
                data,
                headers: { Authorization: `Bearer ${newToken}` , 'Content-Type': 'application/json'},
            });

            return {
                data: retry.data,
                newToken,
            };
        }

        if (err.response?.status === 401) {
            return { logout: true };
        }

        throw err;
    }
};

const refreshTokenFunc=async(refreshToken)=>{
    try{
        let res=await axios.post(`http://localhost:8000/auth/refresh`,null,{headers:{Authorization:`Bearer ${refreshToken}`}});
        return res.data.token;
    }catch(err){
        if(err.response?.status===401){
            return "logout";            
        }
        throw err;
    }
}