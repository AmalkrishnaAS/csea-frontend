import React from 'react'
import './styles/register.css'
import Select from 'react-select'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    function isdigit(_string)
{
    if(_string.match(/^[0-9]+$/) != null)
    {
       return true
       
    }
    else
    {
      return false
    }
}
    
    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
      }
    
    const options=[
        {label:' CSE',value:'cse'},
        {label:' ECE',value:'ece'},
        {label:' EEE',value:'eee'},
        {label:'MECH',value:'mech'}
    ]
    const [forminput, setforminput] = useState({
        name:'',
        dob:'',
        branch:'Select Branch',
        mobile:null,
        email:'',
        sex:'nil'
        
        
        })
        const handlechange=(e)=>{
            
setforminput({...forminput,[e.target.name]:e.target.value})
console.log(forminput);

        }
        const handleselect=(event,action)=>{
            setforminput({...forminput,[action.name]:event.value})

        }
        const handlesubmit=async (e)=>{
            let test=forminput.rollno
            let isnum =isdigit(test.substr(1,6))
            console.log(isnum);


        
            e.preventDefault()
            
            if(!(test[0]==='B'||test[0]==='P'||test[0]==='M')&&(!isLetter(test[8])&&!isLetter(test[7])&&!isnum))
            {
                toast.error('Enter a valid RollNo', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if(forminput.branch==='Select Branch')
            {
                toast.error('Select Branch' , {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else
            {
            try {
                const resp = await axios.post('https://codeinit-reg.herokuapp.com/reg', forminput);
                console.log(resp.data);
               await toast.success('🦄 Form Submitted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } catch (err) {
                
                console.error(err);
                console.log(forminput)
         
                toast.error('OOPS! Something went wrong', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }
         
            
        }
    return (
       <div className="register-body">
           <div className="container-reg">
           <h1>Register Now!</h1>
           <form  onSubmit={handlesubmit}>
           <input  className='input'type="text" name="name" id="name" placeholder='Name' onChange={handlechange} required='required'/>
               <input  className='input'type="text" name="rollno" id="rollno" placeholder='Roll No' minLength={9} maxLength={9} onChange={handlechange} required='required'/>
               <label htmlFor="dob">DoB:</label>
               <input className='input' type="date" name="dob" id="dob" placeholder='DoB' onChange={handlechange} max='2003-12-27' min='2000-12-28' required='required' />
                <input className='input' type="Phone" minLength={10} maxLength={10} placeholder='Phone' onChange={handlechange} name='mobile' required='required' />
                <input type="email" name="email" id="email" className='input' placeholder='Email' onChange={handlechange} required='required' />
                <Select options={options} className='input select' placeholder={forminput.branch} name='branch' onChange={handleselect} ></Select>

                    <label htmlFor="Sex">Sex:<br/></label>
                <div className="redio-group">
                    <label htmlFor="sex" className='label'>Male</label>
                    <input type="radio" name="sex" id="male" className='radio' value='Male' checked={forminput.sex==='Male'?true:false} onChange={handlechange} />
                    
                    <label htmlFor="sex" className='label'>Female</label>
                    <input type="radio"  name="sex" id="Female"  className='radio' value='Female' checked={forminput.sex==='Female'?true:false} onChange={handlechange}/>
                    <label htmlFor="sex " className='label'>Prefer Not to say</label>
                    <input type="radio" name="sex" id="nil" value='nil'  className='radio' checked={forminput.sex==='nil'?true:false} onChange={handlechange}/>
                </div>
                <input type="submit" value="Submit" className='btn' />
           
                
                    
               




           

           </form>
           </div>
       </div>
    )
}

export default Register
