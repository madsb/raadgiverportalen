<template>
  <div class="demo-layout">
    <div class="row">
      <div class="col-12 col-md-3">
        <nav class="demo-sidebar">
          <h3>Demo Kategorier</h3>
          <ul class="unstyled-list">
            <li>
              <RouterLink to="/demo" :exact-active-class="'active-exact'"> Oversigt </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/state" :active-class="'active'"> State Management </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/design" :active-class="'active'"> Design System </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/auth" :active-class="'active'"> Autentificering </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/storage" :active-class="'active'"> Storage API </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/error-handling" :active-class="'active'"> Fejlhåndtering </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/navigation" :active-class="'active'"> Navigation </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/external-api" :active-class="'active'"> Eksterne API'er </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/responsive" :active-class="'active'"> Responsivt Design </RouterLink>
            </li>
            <li>
              <RouterLink to="/demo/data-collection" :active-class="'active'"> Dataopsamling </RouterLink>
            </li>
          </ul>

          <div class="mt-6">
            <RouterLink to="/" class="button button-secondary"> ← Tilbage til forsiden </RouterLink>
          </div>
        </nav>
      </div>

      <div class="col-12 col-md-9">
        <div class="demo-content">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from '../router'
</script>

<style lang="scss" scoped>
.demo-layout {
  padding: 2rem 0;
}

.demo-sidebar {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 4px;
  position: sticky;
  top: 2rem;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  ul {
    margin-bottom: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    display: block;
    padding: 0.5rem 0.75rem;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e0e0e0;
    }

    &.active {
      background-color: #dae8f5;
      color: #004080;
    }

    &.active-exact {
      background-color: #004080;
      color: white;
      font-weight: 500;
    }
  }
}

.demo-content {
  min-height: 400px;
}

@media (max-width: 768px) {
  .demo-sidebar {
    position: static;
    margin-bottom: 2rem;
  }
}
</style>
