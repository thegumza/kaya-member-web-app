<template>
  <route-detail :is-edit="true" />
</template>

<script>
import RouteDetail from './components/RouteDetail'

export default {
  name: 'EditForm',
  components: { RouteDetail }
}
</script>

