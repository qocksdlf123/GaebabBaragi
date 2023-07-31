import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser } from "../../redux/userSlice";

const SocialLoginSuccessHandler = () => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("token: " + params.token);
        axios.defaults.headers.common['Authorization'] = params.token;
        
        axios.get("/oauth2/success", {
            params : {token : params.token},
            headers: {'content-type': 'application/json'}
        }
        )
        .then((res) => {
            if (res.status === 200){
                dispatch(loginUser(res.data));
                navigate("/");
            }
        })
        .catch((res) => {
            console.log(res);
        })
    }, [])

    return (<div> 안녕 </div>);
}

export default SocialLoginSuccessHandler;