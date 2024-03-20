<template>
  <div>
    <h2 class="mt-5">Login:</h2>
    <p>
      Brugere kan være logget ind på Virksomhedsguiden. Hvis de er det, så kan leverandøren anmode om brugerens token, så leverandører-applikationen
      kan gemme data om brugeren i leverandørens eget system med reference til brugerens entitets ID.
    </p>
    <div>
      <h3>Forside</h3>
      <p>
        Når leverandør-applikationer anvender login featuren, skal der vises en forside med information om applikationen, hvor brugeren som minimum
        har mulighed for at logge ind igennem Virksomhedsguiden vha. en knap. Det vil sige, at der skal være en side i leverandør-applikationen som
        brugeren kan se uden at være logget ind.
      </p>
      <h3>Props</h3>
      <h4>isLoggedIn</h4>
      <p>Boolean flag, som angiver om bruger er logget ind i Virksomhedsguiden eller ej.</p>
      <h4>Bruger</h4>
      <p>
        Model objekt med information om brugeren som fx. navn, entitets ID etc. Se <strong>src/models/bruger.model.ts</strong> for komplet liste af
        attributter
      </p>
      <h4>token</h4>
      <p>
        Er en <i>access token</i> fra <a href="https://en.wikipedia.org/wiki/JSON_Web_Token" target="_blank">JWT</a> som leverandør-applikationen kan
        bruge til at kalde Erhvervsstyrelsens beskyttede API'er. Den skal angives som bearer token i Authorization headeren i beskyttede API requests.
      </p>
      <pre>Authorization: Bearer &lt;token&gt;</pre>
      <h3>Events</h3>
      <p>
        Uanset om brugeren er logget ind eller ej (isLoggedIn), så er token og bruger prop ikke udfyldt til at starte med. Den bliver først
        tilgængelig når leverandør-applikationen eksplicit anmoder om token. Dette gøres ved at emitte event <i>requestToken</i> til
        Virksomhedsguiden. Hvis brugeren ikke er logget ind, så vil denne event starte et login forløb i Virksomhedsguiden og ellers bare udfylde
        token prop.
      </p>
      <pre>this.$emit('requestToken');</pre>
      <h3>Flow</h3>
      <p>For en applikation som undersøtter login er forløbet følgende:</p>
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
</template>
