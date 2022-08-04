# Sweet Alert for Bootstrap 5
A Swetalert2 and Bootbox.js alternative build on Bootstrap 5 Modal and Bootstrap 5 Toast components.

## Getting started 
The easiest way to get started is load Swalstrap form CDN:

```
<script src="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.7/dist/js/swalstrap5_all.min.js"></script>
```
swalstrap5_all.js will load automatically Swalstrap style sheet and wil create a default instance of Swalstrap named Swal (an aliased as swal, Sweetalert and sweetalert).

Now you can use Swalstrap applying fire method to Swal:
```
<script>
    Swal.fire('Wanderful!','Swalstrap is working!','success')
</script>
```
If you prefer you can load Swalstrap style sheet separately:
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.7/dist/css/swalstrap.min.css">
```
and load swalstrap5.js version:
```
<script src="https://cdn.jsdelivr.net/npm/@magicbruno/swalstrap5@1.0.7/dist/js/swalstrap5.min.js"></script>
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
## Downloading

Alternatively you can install package via npm:
```
npm install @magicbruno/swalstrap5@1.0.7
```
clone the git package:
```
git clone https://github.com/magicbruno/SwalStrap5.git
```
or [download it](https://github.com/magicbruno/SwalStrap5/archive/refs/heads/main.zip).

>### Warning
>Swalstrap is inspired to Sweetalert NOT a clone. Features are reproduced with radically different coding.
>Il you are a sweetalert user, you are highly recommended to read documentation and test examples.

- [Documentation](https://magicbruno.github.io/SwalStrap5/api.html).
- [Examples](https://magicbruno.github.io/SwalStrap5/basic-examples.html).
- [Customization example](https://magicbruno.github.io/SwalStrap5/custumization.html).




