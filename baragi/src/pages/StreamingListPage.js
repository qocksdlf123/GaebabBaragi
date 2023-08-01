import axios from "axios";

function StreamingListPage() {
  
  const streamingList = []

  function getList() {
    axios.get('http://localhost:9999/meetings')
    .then((res)=>{
      console.log(res.data)
      console.log('response is successful : ', res.data)
      streamingList = res.data
    })
    .catch((err)=>{
      console.log('error : ', err)
    })}
    
  return(
    <div>
      <button onClick={getList}>목록</button>
      {streamingList.map((room)=>{
        return(
          <div>
            <p>{room.title}</p>
            <hr />
          </div>
        )
      })}
    </div>
    )
    
}

export default StreamingListPage;