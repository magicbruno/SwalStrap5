# Sweet Alert for Bootstrap 5
A **Swetalert** and **Bootbox** alternative build on Bootstrap 5 Modal and Toast components. Do you need Swalstrap for Bootstrap 4? 
[Go here](https://github.com/magicbruno/SwalStrap4).

## Getting started 
Load Swalstrap form CDN:

```
<script src="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.8/dist/js/swalstrap5_all.min.js"></script>
```
swalstrap5_all.js will load automatically Swalstrap stylesheet and will create a default instance of Swalstrap named Swal (an aliased as swal, Sweetalert and sweetalert).

You can use Swalstrap applying fire method to the created instance:
```
<script>
    Swal.fire('Wanderful!','Swalstrap is working!','success')
</script>
```
If you prefer you can load Swalstrap stylesheet (or a customized one) separately:
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.8/dist/css/swalstrap.min.css">
```
and load swalstrap5.js version:
```
<script src="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.8/dist/js/swalstrap5.min.js"></script>
```
In this case you must create at least an instance of Swalstrap an then use it to open your popups:
```
<script>
    // Create an instance 
    const mySwal = new Swalstrap();
    // Then use it for all your popups
    mySwal.fire('Wanderful!','Swalstrap is working!','success');
</script>
```
## Downloading Swalstrap

You can install package via npm:
```
npm install @magicbruno/swalstrap5@1.0.8
```
clone the git package:
```
git clone https://github.com/magicbruno/SwalStrap5.git
```
or [download it](https://github.com/magicbruno/SwalStrap5/archive/refs/heads/main.zip).

>### Warning
>Swalstrap is inspired to Sweetalert NOT a clone. Features are reproduced not copied.
>So there are differences. Watch documentation and test examples.

- [Documentation](https://magicbruno.github.io/SwalStrap5/api.html).
- [Examples](https://magicbruno.github.io/SwalStrap5/basic-examples.html).
- [Customization example](https://magicbruno.github.io/SwalStrap5/custumization.html).




