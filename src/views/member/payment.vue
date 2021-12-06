<template>
  <member-payment-receive :is-edit="true" />
</template>

<script>
import MemberPaymentReceive from './components/MemberPaymentReceive'

export default {
  name: 'EditForm',
  components: { MemberPaymentReceive }
}
</script>

