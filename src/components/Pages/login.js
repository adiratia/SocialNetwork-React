import react,{Component} from 'react'
import Field from '../Common/Field'
import {withFormik} from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import * as AuthActions from '../../store/actions/authActions'
import { Button } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

const fields =[
    {name: 'email' , elementName : 'input' , type : 'email', placeholder:'Your email'},
    {name: 'password' , elementName : 'input' , type : 'password', placeholder:'Your Password'}


]

class Login extends Component{

    render(){

        return (
            <div  className ="login-page" >
                <div className = "containter" >
                    <div className = "login-form">
                         <div className= "row">
                             <h1>Login</h1>
                         </div>
                        <div className= "row">
                            <form >
                            {fields.map((f,i)=>{
                            return(
                                <div className = "col-md-12" key={i}>                                
                                    <Field
                                    {...f}
                                    value={this.props.values[f.name]}
                                    name={f.name}
                                    onChange={this.props.handleChange}
                                    onBlur = {this.props.handleBlur}
                                    touched = {this.props.touched[f.name]}
                                    errors = {this.props.errors[f.name]}
                                    />
                                </div>
                                )
                            })}
                            <div className = "col-md-12">
                                <Button
                                    variant="contained"
                                    color="secondary" 
                                    onClick = {e =>{
                                        e.preventDefault();
                                        this.props.login(this.props.values.email,this.props.values.password);
                                    }}>
                                    Login
                                </Button>
                                <br/>
                                <br/>
                                <Button component={RouterLink} to ='/register' color="secondary" aria-label="Register">
                                    Register
                                 </Button>
                            </div>

                            </form>
                          </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}
const mapDispatchToProps =dispatch =>{
    return {
    login:(email, password)=>{
        dispatch(AuthActions.login(email,password));
    }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues : () =>({
        email : '',
        password : ''
    }),
    validationSchema: Yup.object().shape({
        email : Yup.string().email('Email is invalid. ').required('you need to login with email address'),
        password: Yup.string().required('You need to enter your password')
    }),
    handleSubmit : (values,{setSubmitting},login) =>{
        console.log("Login attempt", values);
        login(values.email,values.password);
    }
})(Login));