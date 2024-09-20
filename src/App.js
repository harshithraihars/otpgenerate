import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [generatedotp,setGeneratedotp]=useState("")
  const [otp,setOtp]=useState(["","","",""])
  const [check,setCheck]=useState(null)
  const [timeleft,setTimeleft]=useState(30)
  const inputref=useRef([])
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeleft((prevTimeleft) => {
        if (prevTimeleft > 0) {
          return prevTimeleft - 1;
        } else {
          clearInterval(timer);  // Stop the timer when it reaches 0
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);  // Cleanup on unmount
  }, [generatedotp]);
  
  const generateOtp=(e)=>{
    setCheck(null)
    setOtp(["","","",""])
    if(timeleft!==30){
      setTimeleft(30)
    }
    e.preventDefault()
    let newotp=""
    for(let i=0;i<4;i++){
      newotp+=Math.floor(Math.random()*10).toString()
    }
    setGeneratedotp(newotp)
  }
  const handleInput=(index,value)=>{
    const newotp=[...otp]
    newotp[index]=value
    setOtp(newotp)
    if(index<otp.length-1){
      inputref.current[index+1].focus()
    }
  }
  const handleEnter=(index,e)=>{
    if(e.key==="Backspace" && index>0 && !otp[index]){
      setCheck(null)
      const newotp=[...otp]
      newotp[index]=""
      inputref.current[index-1].focus()
      setOtp(newotp)
    }
    console.log(index)
    if(index===3 && e.target.value){
      if(otp.every((val)=>val!=="")){
        let EnteredOtp=otp.join("")
      if(EnteredOtp===String(generatedotp)){
        setCheck(true)
      }
      else{
        setCheck(false)
      }
      }
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen '>
      <div className='border-2 border-solid border-gray-300 p-10 shadow-emerald-950'>
        <h1 className='text-4xl text-green-400 font-bold'>OTP GENERATOR AND CHECKER</h1>
        <h1 className='text-3xl text-green-600 mt-4'>Hello User</h1>
        <div className=' flex items-center justify-center'>
          <button className='w-40 h-10 b bg-green-500 text-white border-none rounded-md font-medium' onClick={(e)=>generateOtp(e)}>Generate OTP</button>
        </div>
        <div className='mt-5'>
        {generatedotp ? (
          <>
            <h3 className='text-1xl font-medium'>Your OTP is <span className='text-red-600'>{generatedotp}</span> valid for 30 seconds</h3>
            <div className='flex items-center justify-center gap-1 mt-4'>
            {otp.map((value,index)=>{
              return(
                <>
              <input type="text" key={index} value={value} 
              onChange={(e)=>handleInput(index,e.target.value)} 
              ref={(ref)=>inputref.current[index]=ref}
              className={`h-10 w-10 border-2 border-solid  text-center rounded-md ${check===true &&
                otp.every((val)=>val!=="")? "border-green-400":check===false ? "border-red-500":"border-gray-400"
               }`}
              autoFocus={index===0}
              onKeyDown={(e)=>handleEnter(index,e)} maxLength={1}></input>
              </>
              )
            })}
            </div>
            <div>
              <h2 className='text-md text-gray-700 mt-2'> Generate new OTP in 00:{timeleft<10?`0${timeleft}`:timeleft}{
                timeleft===0 ? (
                  <>
                  <span><a className='underline p-1 text-green-400 hover:cursor-pointer' onClick={generateOtp}>new OTP</a></span>
                  </>
                ):""
              }</h2>
            </div>
          </>
            
          ):""}
        </div>
      </div>
    </div>
  )
}

export default App
