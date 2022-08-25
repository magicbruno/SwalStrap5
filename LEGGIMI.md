# Sweet Alert for Bootstrap 5
Un'alternativa a **Swetalert** e **Bootbox**, basata sulle componenti Modal e Toast di Bootstrap 5. Cerchi una versione per Bootstrap 4? [Go here](https://github.com/magicbruno/SwalStrap4).

## Per iniziare 
Carica Swalstrap da CDN:

```
<script src="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.8/dist/js/swalstrap5_all.min.js"></script>
```
swalstrap_all.js caricherà automaticamente il foglio di stile necessario e creerà un'istanza predefinita della classe Swalstrap chiamata Swal (verranno creati anche gli alias: swal, Sweelelert e sweelelert).

Per utilizzare Swalstrap devi applicare il metodo fire() all'istanza creata:
```
<script>
    Swal.fire('Wanderful!','Swalstrap is working!','success')
</script>
```
Se preferisci caricare separatamente il foglio di stile (o caricarne uno personalizzato):
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.8/dist/css/swalstrap.min.css">
```
devi usare swalstrap.js:
```
<script src="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.8/dist/js/swalstrap5.min.js"></script>
```
In questo caso è a tuo carico creare almeno un'istanza di swalstrap:
```
<script>
    // Create an instance 
    const mySwal = new Swalstrap();
    // Then use it for all your popups
    mySwal.fire('Wanderful!','Swalstrap is working!','success');
</script>
```
## Download

In alternativa è possibile installare il pacchetto tramite npm:
```
npm install @magicbruno/swalstrap5@1.0.8
```
clonare il repository Git:
```
git clone https://github.com/magicbruno/SwalStrap5.git
```
or [scaricarlo](https://github.com/magicbruno/SwalStrap5/archive/refs/heads/main.zip).

>### Avvertimento
>Swalstrap è ispirato a Sweelelert, non è un clone della componente. Le caratteristiche sono riprodotte non copiate.
>E quindi ci sono differenze. Controlla la documentazione e gli esempi.

- [Documentazione](https://magicbruno.github.io/SwalStrap5/api.html).
- [Esempi](https://magicbruno.github.io/SwalStrap5/basic-examples.html).
- [Esempio di personalizzazione](https://magicbruno.github.io/SwalStrap5/custumization.html).




