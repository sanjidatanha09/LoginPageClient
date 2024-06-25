
import './App.css'

function App() {
  return (
    <>

{/*     const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const name = firstName + " " + lastName
    const email = e.target.email.value;
    const mobile = e.target.phone.value;
    const classname_id = e.target.className.value;
    const password = e.target.password.value;
    const password_confirmation = e.target.re_password.value;

    if(password !== password_confirmation){
      return toast.error("Password not match")
    }

    const info = {name, email, mobile, classname_id, gender, password, password_confirmation }
    
    try {
      axiosPublic.post("/api/register", info)
      .then(res => {
        if(res.data){
          toast.success(res.data.message)
          e.target.reset()
          setLoading(false)
          navigate('/login')
        }
      })
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
    }

  } */}
    </>
  )
}

export default App
