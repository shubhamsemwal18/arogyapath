import PaginationStyle from '../../css/pagination.module.css';

export  const Pagination = (props) =>{
    const {from, to, current} = props
    const  i = from;
    const data = [];

    let handleClick = (e) =>{
        props.onclick(e)
    }

    for(i; i<=to; i++){

        if(to < 7){
            data .push(
        
                <button name='currentPage' 
                className={` btn ${current == i ? PaginationStyle.highlightMe : ''}`} 
                value={i}  
                key={i}
                onClick={(e)=>handleClick(e)}>{i}
            </button>
            )
        }
        else{

            if(current < 4){

                if(i <= 5){
                    data .push(
        
                        <button name='currentPage' 
                        className={` btn ${current == i ? PaginationStyle.highlightMe : ''}`} 
                        value={i}  
                        onClick={(e)=>handleClick(e)}
                        key={i}>{i}
                    </button>
                    )

                }

                if(i == to){
                    data .push(
                        <>
                        <p className="m-0 d-flex align-items-center">....</p>
                        <button name='currentPage' 
                        className={` btn ${current == i ? PaginationStyle.highlightMe : ''}`} 
                        value={i}
                        onClick={(e)=>handleClick(e)}
                        key={i}>{i}
                    </button>
                    </>
                    )
                }
            }
            else{

                if(i == 1){
                    data .push(
                        <>
                        <button name='currentPage' 
                        className={` btn ${current == i ? PaginationStyle.highlightMe : ''}`}
                        onClick={(e)=>handleClick(e)} 
                        value={i}  
                        key={i}>{i}
                    </button>
                    <p className="m-0 d-flex align-items-center">....</p>
                    </>

                    )
                }
                else{
                    if(i >= (current - 2) && i <= (current + 2)){
                        data .push(
        
                            <button name='currentPage' 
                            className={` btn ${current == i ? PaginationStyle.highlightMe : ''}`} 
                            value={i}
                            onClick={(e)=>handleClick(e)}
                            key={i}>{i}
                        </button>
                        )  
                    }

                    if(to > (current + 2) && i == to){
                        
                        data .push(
                            <>
                            <p className="m-0 d-flex align-items-center">....</p>
                            <button name='currentPage' 
                            className={` btn ${current == i ? PaginationStyle.highlightMe : ''}`} 
                            value={i}
                            onClick={(e)=>handleClick(e)}
                            key={i}>{i}
                        </button>
                        </>
                        ) 
                    }

                }

            }


        }

    }

    return data;
}