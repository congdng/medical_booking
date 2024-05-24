import { 
    CHATLIST_CONVO_REQUEST, 
    CHATLIST_CONVO_GET,
    CHATLIST_CONVO_GETFAIL, 
    CHATLIST_CONVO_CREATE,
    CHATLIST_CONVO_CREATEFAIL} from "../constants/chatConstant";
  import axios from "axios";
  export const get_chatlist = (id, role) => async (dispatch, getState) => {
     try { 
      dispatch({
          type: CHATLIST_CONVO_REQUEST,
        });
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `http://localhost:8000/api/chat/${id}/${role}/getConvo`,
          {id: id, role: role},
          config
        );
        dispatch({
          type: CHATLIST_CONVO_GET,
          payload: data
        });
      }
  
        catch(e){
          dispatch({ type: CHATLIST_CONVO_GETFAIL, 
              payload: e.response && e.response.data.error
              ? e.response.data.error
              : e.message, })
        }     
  
  }
  export const create_chat = (id, findRole) => async (dispatch, getState) => {
    console.log("create now: "+id)
    try{
    dispatch({type: CHATLIST_CONVO_REQUEST})
    const { userLogin: {userInfo} } = getState() 
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    
    }
    
    const body = findRole === 'patient'? {dtid: id, pid: userInfo._id, findRole: findRole} : {dtid: userInfo._id, pid: id, findRole: findRole}
    const {data} = await axios.post( `http://localhost:8000/api/chat/createConvo`, body, config)
    dispatch({
      type: CHATLIST_CONVO_CREATE,
      payload: data
    });
    }
    catch (e){
      console.log(e)
      dispatch({ type: CHATLIST_CONVO_CREATEFAIL, 
        payload: e.response && e.response.data.error
        ? e.response.data.error
        : e.message, })
    }
    
  
  
  
  }