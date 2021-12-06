<template>
  <member-payment-verify :is-edit="true" />
</template>

<script>
import MemberPaymentVerify from './components/MemberPaymentVerify'

export default {
  name: 'EditForm',
  components: { MemberPaymentVerify }
}
</script>

