<template>
<section>
    <NavbarComponent/>
    <div class="container mx-auto mt-10 pb-10">
        <div class="flex flex-wrap justify-center">
            <div class="w-full max-w-lg">
                <Transition name="fade" mode="out-in" appear @after-leave="onAfterLeave">
                <div class="flex flex-col break-words bg-gray-200 border rounded lg:rounded-lg shadow-md" v-if="!form_completed">
                    <div class="font-semibold bg-gray-800 text-gray-200 rounded lg:rounded-t-lg lg:rounded-b-none py-3 px-6 mb-0">
                        <h1 class="text-center">Sign Up</h1>
                    </div>
                    <div class="w-full p-6">
                        <div class="flex flex-wrap mb-6">
                            <label for="first_name" class="block text-gray-700 text-sm font-bold mb-2">
                                First Name
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="first_name"
                                type="text"
                                placeholder="First Name"
                                v-model="newUser.firstName"
                                required
                            />
                            <label for="last_name" class="block text-gray-700 text-sm font-bold mb-2">
                                Last Name
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="last_name"
                                type="text"
                                placeholder="Last Name"
                                v-model="newUser.lastName"
                                required
                            />
                        </div>
                        <div class="flex flex-wrap mb-6">
                            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="email@example.com"
                                v-model="newUser.email"
                                required
                            />
                        </div>
                        <div class="flex flex-wrap mb-6">
                            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                                v-model="newUser.passwordHash"
                                required
                            />
                            <label for="password_confirmation" class="block text-gray-700 text-sm font-bold mb-2">
                                Re-enter Password
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password_confirmation"
                                type="password"
                                placeholder="******************"
                                v-model="password_confirmation"
                                required
                            />
                            <p class="text-red-500 text-xs italic">
                                {{ newUser.passwordHash === password_confirmation ? '' : 'Passwords do not match' }}
                            </p>
                        </div>
                        
                        <div class="flex flex-wrap mb-6">
                            <label for="phone_number" class="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone_number"
                                type="text"
                                placeholder="(123) 456-7890"
                                v-model="newUser.phoneNumber"
                                required
                            />
                        </div>
                        <div class="flex flex-wrap">
                            <label for="date_of_birth" class="block text-gray-700 text-sm font-bold mb-2">
                                Date of Birth
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="date_of_birth"
                                type="date"
                                placeholder="Date of Birth"
                                v-model="newUser.dateOfBirth"
                                required
                            />
                        </div>
                        <!-- <div class="flex flex-wrap justify-center my-6">
                            <label for="first_name" class="block text-gray-700 self-center text-sm font-bold mb-2">
                                Shipping Address Information
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="street_address"
                                type="text"
                                placeholder="Street Address"
                                v-model="newUser.shipping_address[0].street_address"
                                required
                            />
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="city"
                                type="text"
                                placeholder="City/Town"
                                v-model="newUser.shipping_address[0].city"
                                required
                            />
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="parish"
                                type="text"
                                placeholder="State/Province/Parish"
                                v-model="newUser.shipping_address[0].parish"
                                required
                            />
                        </div> -->
                         <p class="text-red-500 text-md italic">
                               {{error}}
                            </p>
                        <div class="flex items-center justify-end">
                        <button
                            class="btn btn-info"
                            @click="getVerificationCode()"
                        >
                            Register
                        </button>
                        </div>
                    </div>
                </div>
                </Transition>
                <Transition name="fade" mode="out-in">
                    <div class="bg-gray-200 h-fit rounded-lg p-5" v-if="email_valid">
                        <span v-if="!registerSuccess">
                            <p class="font-bold text-3xl text-center text-gray-800">Email Verification</p>
                            <p class="font-medium text-lg my-3 text-center text-gray-700">A 5 digit Verification code was just sent to <span class="font-medium">{{newUser.email}}</span> , check your email and enter the code here to continue the sign-up process</p>
                            <span class="flex justify-center">
                                <input type="text" v-model="code_from_user" class="input input-ghost border-gray-800">
                            </span>
                            
                            <span class="flex justify-between items-center">
                                <p class="text-red-500 text-md italic">{{verify_error}}</p>
                                <button class="btn btn-info" @click="signUp">Verify</button>
                            </span>
                        </span>
                        <span v-if="registerSuccess">
                            <p class="font-bold text-3xl text-center text-green-700">Email Verified!</p>
                            <span class="flex justify-center items-center mt-5">
                                <button class="btn" @click="">GO TO login</button>
                            </span>
                        </span>
                    </div>
                </Transition>
                

            </div>
        </div>
    </div>
    <FooterComponent/>
</section>
   
</template>
<script setup lang="ts">
import NavbarComponent from '../components/NavbarComponent.vue'
import DataService from '../DataService'
import FooterComponent from '../components/FooterComponent.vue'
import { ref } from 'vue'
import { Gender, Role, User } from '@prisma/client'
import { useRouter } from 'vue-router'

const router = useRouter()

let error = ref('')
let password_confirmation = ref('')
let form_completed = ref(false)
let email_valid = ref(false)
let code_from_user = ref('')
let verify_error = ref('')
let registerSuccess = ref(false)
let verification_code = ref('')


let newUser = ref<User>({
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    phoneNumber: '',
    dateOfBirth : new Date(),
    gender: 'RATHER_NOT_SAY',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: '',
    role: Role.USER,
})
 function validateEmail(email: string) {
            //eslint-disable-next-line
            if(email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                return true
            }else{
                error.value = 'Invalid email format'
                return false
            }
        }

 function validatePassword(password: string) {
            //eslint-disable-next-line
            if(password.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/)){
                return true
            }else{
                return false
            }
        }

function validatePhoneNumber(num: string){
    if(num.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
        return true
    }else{
        return false
    }
}

 function formValidation(){
            if(newUser.value.email === '' || newUser.value.passwordHash === '' || password_confirmation.value === '' || newUser.value.firstName === '' || newUser.value.lastName === '' || newUser.value.phoneNumber === '' || newUser.value.dateOfBirth === null){
                error.value = 'Please fill out all fields'
                return false
            }else{
                if(newUser.value.passwordHash !== password_confirmation.value){
                    error.value = 'Passwords do not match'
                    return false
                }else{
                    if(!validatePhoneNumber(newUser.value.phoneNumber)){
                        error.value = 'Invalid phone number format'
                        return false
                    }else{
                        if(!validateEmail(newUser.value.email)){
                            error.value = 'Invalid email format'
                            return false
                        }else{
                            if(!validatePassword(newUser.value.passwordHash)){
                                error.value = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
                                return false
                            }else{
                                return true
                            }
                        }
                    }
                }
            }
        }

        async function getVerificationCode() {
            if (formValidation()) {
                    form_completed.value = true;
            } else {
                console.log('Form is not valid');
            }
        }

       async function signUp(){
            if(true){
                let res = await DataService.signUp(newUser.value)
                if(res.status){
                    registerSuccess.value = true
                }else{
                    verify_error.value = res.message
                }
            }
        }
        async function onAfterLeave() {
            email_valid.value = true
            // let response = await DataService.sendVerificationEmail(newUser.value.email)
            // console.log(response);
            // verification_code.value = response.code 
        }

</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>