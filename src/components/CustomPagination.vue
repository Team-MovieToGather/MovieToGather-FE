<script setup>
//Vue Material Kit 2 components
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-2 mx-auto">
          <MaterialPagination>
            <MaterialPaginationItem prev class="ms-auto" />
            <MaterialPaginationItem label="1" active />
            <MaterialPaginationItem label="2" />
            <MaterialPaginationItem label="3" />
            <MaterialPaginationItem next />
          </MaterialPagination>
        </div>
      </div>
    </div>
  </section>
</template>
