<template>
  <div class="login">
    <h2>Login with Mobile</h2>

    <input
      v-model="mobile"
      placeholder="Enter mobile number"
      maxlength="10"
      @input="clearError"
    />
    <button @click="requestOTP" :disabled="loading">Send OTP</button>

    <div v-if="otpSent">
      <input
        v-model="otp"
        placeholder="Enter OTP"
        maxlength="6"
        @input="clearError"
      />
      <button @click="verifyOTP" :disabled="loading">Verify</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading" class="loading">Please wait...</p>
  </div>
</template>

<script>
import { loginWithOTP, verifyOTP } from '../services/authService'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      mobile: '',
      otp: '',
      otpSent: false,
      loading: false,
      error: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    
    clearError() {
      this.error = ''
    },

    async requestOTP() {
      if (!/^\d{10}$/.test(this.mobile)) {
        this.error = "Please enter a valid 10-digit mobile number"
        return
      }

      this.loading = true
      this.error = ''
      try {
        await loginWithOTP(this.mobile)
        this.otpSent = true
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to send OTP'
      } finally {
        this.loading = false
      }
    },

    async verifyOTP() {
      if (!this.otp) {
        this.error = "Please enter the OTP"
        return
      }

      this.loading = true
      this.error = ''
      try {
        const res = await verifyOTP(this.mobile, this.otp)
        this.login(res.data.user)
        this.$router.push('/')
      } catch (err) {
        this.error = err.response?.data?.error || 'OTP verification failed'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.login h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}
.login input {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: #42b983;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
.login button:disabled {
  background-color: #a5d6c1;
  cursor: not-allowed;
}
.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
.loading {
  color: #555;
  text-align: center;
  margin-top: 1rem;
}
</style>
