<template>
  <route-detail :is-edit="false" />
</template>

<script>
import RouteDetail from './components/RouteDetail'

export default {
  name: 'CreateRoute',
  components: { RouteDetail }
}
</script>

