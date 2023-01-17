import { useEffect, useState } from 'react';
import {collection, getDocs} from "firebase/firestore"
import {db} from './firebase'
import React from 'react';
import './App.css'
import "react-datepicker/dist/react-datepicker.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';


function App() {    

    const [demographic, setdemog] = useState([''])
    const [index, setindex] = useState('Male01')

    const [Location_value, set_location] = useState('All')
    const [Gender_value, set_gender] = useState('All')
    const [Date_value, set_date] = useState('Any')

    const location = ['Chennai', 'Hyderabad', 'Bangalore', 'All']
    const gender = ['Male', 'Female', 'All']

     useEffect(()=>{

        const listdemog=async()=>{
            const applications =  collection(db, 'applications')
            const snap = await getDocs(applications)


            snap.docs.map(el=>{
                return(
                setdemog(data=>[...data, el.data()]))
            })

            // coutn males and females
         }

         listdemog()
    }, [])

    const filteredData=()=>{
       const fdata = [...demographic]
       
       let data = fdata.filter(el=>{
        // if(el.Location == 'All') return el.Location;
        if(Location_value !=='All' && Gender_value !== 'All'){
            if (!Location_value.includes(el.Location)) return false; 
            if (!Gender_value.includes(el.Gender)) return false; 
        return el
        }

        if(Location_value === 'All' && Gender_value !== 'All'){
            if (!Gender_value.includes(el.Gender)) return false; 
            return el
        }

        if(Location_value !== 'All' && Gender_value === 'All'){
            if (!Location_value.includes(el.Location)) return false;
            return el  
        }

        if(Location_value === 'All' && Gender_value === 'All'){
            return el  
        }

        return el
        
       })
       
       if (Date_value !== 'Any' && Date_value !== ''){
         data = data.filter(el=>{
            const date1 = new Date(Date_value);
            const date2 = new Date(el.Date);

            if (date1.getTime() !== date2.getTime()) return false;
            return el
        })
       }

       return data
       
     }

    return(
        <React.Fragment>            
        {
        demographic.length>1 &&
        <React.Fragment>
        <header className='d-flex justify-content-center justify-content-md-between flex-wrap px-2 py-1 p' style={{backgroundColor:'rgb(75,0,130)'}}>
        <div className='fw-bold text-center fs-3 p-0 m-0' style={{color:'skyblue'}}>
            SECQUR<span className='p-0 m-0 text-center text-danger fs-1'>AI</span>
            SE
        </div>
        
        <div className='d-flex'>
        <div className='me-5'>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search text-light mt-2" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        </div>

        <h4 className='btn bg-success fw-bold px-3 me-1'>{demographic.filter(el=>el.Gender==='Male').length}</h4>
        <h4 className='bg-danger btn px-3 fw-bold'>{demographic.filter(el=>el.Gender==='Female').length}</h4>
        </div>
        </header>


       <div className="mainContainer gap-2 d-flex flex-wrap px-1 justify-content-center" style={{backgroundColor:'rgba(112,112,112, 0.5)'}}>
            <div className="details bg-light d-flex flex-wrap flex-grow-1 justify-content-center
            align-items-center
            ">
                
                    <DemogSection props={{index:index, data:demographic}}/>
        
            </div>
            <div className='bg-light d-flex m-0 me-1 my-2 flex-grow-1 justify-content-center'>
            <div className="listmain d-flex flex-column" style={{width:'100%', maxWidth:'700px'}}>
                <div className="header fw-bold fs-6 d-flex justify-content-between px-2">
                   <div className='fs-4'>Events</div>   
                   
                  
                   <div className="btn-group pe-3 pb-2">
                    <button className="btn btn-secondary dropdown-toggle mt-1" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                    Filter
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuClickable">

                        <li className='p-1'>
                        <div className="btn-group  align-items-center">
                            Location: 
                            <button className="btn ms-1 dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                {Location_value}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                                {
                                    location.map((city, i)=>{
                                        return(
                                            <li><a className="dropdown-item" id='Location' onClick={(e)=>{
                                               
                                                set_location(e.target.innerText)
                                            }} key={i}>{city}</a></li>
                                        )
                                    })
                                }
                            </ul>
                            </div>
                        </li>

                        <li className='p-1'>
                        <div className="btn-group  align-items-center">
                            Gender: 
                            <button className="btn ms-1 dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                               {Gender_value}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                                {
                                    gender.
                                    map((city, i)=>{
                                        return(
                                            <li><a className="dropdown-item" id='Gender' onClick={(e)=>{
                                            
                                                set_gender(e.target.innerText)
                                            }} key={i} href="#">{city}</a></li>
                                        )
                                    })
                                }
                            </ul>
                            </div>
                        </li>

                        <li className='p-1 d-flex'>
                            Date:
                            <input type="date" className='form-control ms-2' style={{width:'70%'}} onSelect={(e)=>{set_date(e.target.value)}} />

                        </li>
                        
                    </ul>
                    </div>
                                            
                </div>
                <div className="boydi" style={{maxHeight:'650px',height:'100%',overflow:'scroll', width:'100%', maxWidth:'700px'}}>
                    {  
                        
                        filteredData().length > 0 &&
                        filteredData()
                        .map((data, i)=>{
                            return(
                                <li key={i} id={'listbu'+i}  onClick={(e)=>
                                    {
                                    setindex(data.Name);        
                                }
                                }
                                 className='m-1 p-1 listbu'>
                                <div className='d-flex justify-content-between'>
                                    <div className='text-dark'>{data.ID} {data.Location}</div>
                                    <div className='text-dark'>{data.Date} {data.Time}</div>
                                    <div className='text-dark'>{data.Name}</div>
                                </div>        
                                <div className='text-dark'>Person Detected</div>
                            </li>
                            )
                        })
                    }

                    {
                        filteredData().length === 0 &&
                        <h3 className='text-center'>No Data Found</h3>
                    }

                </div>
            </div>
            </div>
        </div>
        </React.Fragment>}
        </React.Fragment>
    )

}


const DemogSection=(props)=>{
    const {index, data} =props.props
    const filterd = data.filter(el=>el.Name===index) 
    const {Name, Location, Date, Time, ID, Gender} = filterd[0]

    return(
        <div className='d-flex flex-wrap'>
                <div className="demographic align-self-center px-1 mb-5">
                   <div className="head">
                        <div className='fw-bold fs-4'>{ID}</div>
                        <div className='fw-bold fs-5'>Person Detected</div>
                    </div>
                    
                        <div className="body_section mt-3">
                        <pre className='tab fs-5 m-0'>Name      :{Name}</pre>
                        <pre className='tab fs-5 m-0'>Location  :{Location}</pre>
                        <pre className='tab fs-5 m-0'>Date      :{Date}</pre>
                        <pre className='tab fs-5 m-0'>Time      :{Time}</pre>
                    </div>

                    <div className="bottom mt-3">
                        <div className='fw-bold fs-5'>Description</div>
                        <p className='fs-5'>{Name} Detected at {Location} on {eval.Date}</p>
                    </div>

                </div>

                <div className="picture" style={{maxWidth:'450px'}}>
                    <h4 className="fw-bold">{Gender}</h4>
                    <div className="text-center px-1" style={{width:'100%', height:'550px'}}>
                        <LazyLoadImage
                        src={`https://firebasestorage.googleapis.com/v0/b/myapp-5d8c3.appspot.com/o/images%2F${Name}.jpg?alt=media`}
                        height='100%'
                        width='100%'
                        effect='blur'
                        />
                    </div>
                </div>
                </div>
    )
}
export default App;