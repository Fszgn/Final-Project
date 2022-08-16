
const checkType = (el) => {
    if (el.signedMentor !==null) {
        
    return "mentor"
    }
    else if (el.signedStudent !== null) {
      return "student"
    } 
}

export default checkType