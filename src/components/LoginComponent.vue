<template>
  <div>
    <h2 class="mt-5">Login:</h2>
    Brugere kan være logget ind på Virksomhedsguiden. Hvis de er det, så kan leverandøren anmode om brugerens token, så leverandører-applikationen kan
    gemme data om brugeren i leverandørens eget system med reference til brugerens entitets ID.
    <div>
      <h4>Forside</h4>
      <div>
        Når leverandør-applikationer anvender login featuren, skal der vises en forside med information om applikationen, hvor brugeren som minimum
        har mulighed for at logge ind igennem Virksomhedsguiden vha. en knap. Det vil sige, at der skal være en side i leverandør-applikationen som
        brugeren kan se uden at være logget ind.
      </div>
      <h4>Props</h4>
      <h5>isLoggedIn</h5>
      <div>Boolean flag, som angiver om bruger er logget ind i Virksomhedsguiden eller ej.</div>
      <h5>Bruger</h5>
      <div>
        Model objekt med information om brugeren som fx. navn, entitets ID etc. Se <strong>src/models/bruger.model.ts</strong> for komplet liste af
        attributter
      </div>
      <h5>token</h5>
      <div>
        Er en <i>access token</i> fra <a href="https://en.wikipedia.org/wiki/JSON_Web_Token" target="_blank">JWT</a> som leverandør-applikationen kan
        bruge til at kalde Erhvervsstyrelsens beskyttede API'er. Den skal angives som bearer token i Authorization headeren i beskyttede API requests.
      </div>
      <pre>Authorization: Bearer &lt;token&gt;</pre>
      <h4>Events</h4>
      <div>
        Uanset om brugeren er logget ind eller ej (isLoggedIn), så er token og bruger prop ikke udfyldt til at starte med. Den bliver først
        tilgængelig når leverandør-applikationen eksplicit anmoder om token. Dette gøres ved at emitte event <i>requestToken</i> til
        Virksomhedsguiden. Hvis brugeren ikke er logget ind, så vil denne event starte et login forløb i Virksomhedsguiden og ellers bare udfylde
        token prop.
      </div>
      <pre>this.$emit('requestToken');</pre>
      <h4>Flow</h4>
      For en applikation som undersøtter login er forløbet følgende:
      <div>
        <ol>
          <li>Der vises en forside hvor der skal være en knap, som anmoder om token via <i>requestToken</i> event</li>
          <ol type="A">
            <li>Hvis brugeren er logget ind, så vil property <i>token</i> blive udfyldt med access token</li>
            <li>
              Hvis brugeren ikke er logget ind, så vil Virksomhedsguiden initiere login forløb og brugeren vil vende tilbage til
              leverandør-applikationen efter succesfuldt login med udfyldt token.
            </li>
          </ol>
          <li>
            Når token er tilgængelig som prop, kan leverandør-applikationen skifte væk fra forsiden ved at skifte hash i URL. se fane 'Navigation' for
            mere information
          </li>
          <li>Nu kan <i>token</i> og <i>bruger</i> props bruges</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginComponent'
});
</script>
