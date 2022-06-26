# 1. FM Viewer
Simple javascript file viewer.

[Demo and documentation.](https://magicbruno.github.io/FM_Viewer/)

## 1.1. Introduction
FM Viewer is a simple file and gallery viewer whose UI is modelled on popular FancyBox. 

Main features:
- Completely free and open source
- No dependencies
- Very light (js + css about 20 Kb minimized)
- Completely customizable
- Written using ES6 classes
- Works in all *modern browsers*

## 1.2. Getting started

Install via npm:
```
npm install @magicbruno/fm_viewer
```
or link directly from CDN:
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@magicbruno/fm_viewer/dist/css/file-man.min.css">

<script src="https://cdn.jsdelivr.net/npm/@magicbruno/fm_viewer/dist/js/FM_Viewer.js"></script>
```

If you prefer yuo can [Download](https://github.com/magicbruno/FM_Viewer/archive/refs/heads/main.zip) `or` clone repository. Distribution files are in the **dist** folder.

Link css stuff in the `head` of your page:

```
<head>
...
    <link rel="stylesheet" href="..../file-man.css">
...
</head>
```
 
Link script file at the end of body section of the html page.

```
<script src="..../FM_Viewer.js"></script>
```
and then create an instance of the FM_Viewer class to initialize the viewer.
```
<script>
    (function(win){
        win.TheViewer = new FM_Viewer(<selector>);
    })(window);
</script>
```
The `<selector>` parameter is the HTML element on which the viewer is built. 
## 1.3. Basic usage
If you create the viewer instance with no parameter, FM_Viewer will build its own element on the fly and append it to the `body` of the page.

```
const TheViewer = new FM_Viewer();
```
All `<a>` elements with `data-fmviewer` attribute are registered by the viewer when the `DOMContentLoaded` event is fired, and then they will open its href in the viewer.

You can optionally specify the type of the document to show using `data-type` attribute. Valid types are: `image`, `video`, `audio` and `iframe`.

 > #### NOTES
 >- The viewer try to determine the type of the document linked to by file extension. If the url has no extension you must specify the type using `data-type` attribute.
 >- Use video type only for link to real video files. Form Vimeo or YouTube video use iframe type instead (see example).

If you add links after, for example via ajax call, you may call the viewer refresh method to update the viewer.

```
TheViewer.refresh();
```


Here is the code appended to the `body`.

```
<div class="fm-viewer off-screen" id="fm-828573602">
    <nav class="fm-navbar" role="navigation">
        <h3 class="viewer-title"></h3>
        <ul class="fm-navbar-nav" style="margin-left:auto">
            <li class="">
                <button type="button" data-action="download-file" title="Scarica" class="btn btn-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M.6 13.7c0-.6.6-1.1 1.1-1.1s1.1.6 1.1 1.1v5.7c0 1.3 1 2.3 2.3 2.3h13.6c1.3 0 2.3-1 2.3-2.3v-5.7c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v5.7c0 2.5-2 4.5-4.5 4.5H5.2c-2.5 0-4.5-2-4.5-4.5-.1-3.4-.1-5.3-.1-5.7z" opacity=".5" fill="#fff"></path>
                        <path d="M12 16c-.6 0-1.1-.5-1.1-1.1V1.2c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v13.6c0 .7-.5 1.2-1.1 1.2z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff"></path>
                        <path d="M16.9 9.5c.4-.5 1.1-.5 1.6 0s.4 1.2 0 1.6l-5.7 5.7c-.4.4-1.1.4-1.6 0l-5.7-5.1c-.5-.4-.5-1.1-.1-1.6.5-.5 1.2-.5 1.7-.1l4.9 4.4 4.9-4.9z" fill="#fff"></path>
                    </svg>
                </button>
            </li>
            <li class="">
                <button type="button" data-action="previous" title="Precedente" class="btn btn-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M18.4 2.9c.7-.7.7-1.8 0-2.4-.7-.7-1.8-.7-2.4 0L5.6 10.8c-.6.6-.6 1.7 0 2.4L15 23.4c.6.7 1.7.7 2.4.1s.7-1.7.1-2.4L9.2 12l9.2-9.1z" fill="#fff"></path>
                    </svg>
                </button>
            </li>
            <li class="">
                <button type="button" data-action="next" title="Successivo" class="btn btn-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M5.6 2.9C5 2.3 5 1.2 5.6.5c.7-.7 1.8-.7 2.4 0l10.3 10.3c.6.6.7 1.7.1 2.4L9 23.4c-.6.7-1.7.7-2.4.1s-.7-1.7-.1-2.4l8.3-9.1-9.2-9.1z" fill="#fff"></path>
                    </svg>
                </button>
            </li>
            <li class="">
                <button type="button" data-action="fullscreen-on" title="Fullscreen on" class="btn btn-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M9.9 12L2.2 4.3c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0L12 9.9 21.3.6c.6-.6 1.5-.6 2.1 0s.6 1.5 0 2.1L14.1 12l9.3 9.3c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L12 14.1l-7.7 7.7c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1L9.9 12z" opacity=".7" fill-rule="evenodd" clip-rule="evenodd" fill="#fff"></path>
                        <path d="M3 21h4.5c1 .2 1.5.7 1.5 1.5s-.5 1.3-1.5 1.5H0v-7.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V21zm18 0v-4.5c.2-1 .7-1.5 1.5-1.5s1.3.5 1.5 1.5V24h-7.5c-1 0-1.5-.5-1.5-1.5s.5-1.5 1.5-1.5H21zm0-18h-4.5c-1-.2-1.5-.7-1.5-1.5S15.5.2 16.5 0H24v7.5c0 1-.5 1.5-1.5 1.5S21 8.5 21 7.5V3zM3 3v4.5C2.8 8.5 2.3 9 1.5 9S.2 8.5 0 7.5V0h7.5C8.5 0 9 .5 9 1.5S8.5 3 7.5 3H3z" fill="#fff"></path>
                    </svg>
                </button>
            </li>
            <li class="">
                <button type="button" data-action="fullscreen-off" title="Fullscreen off" class="btn btn-dark">
                    <svg version="1.1" id="prefix__Livello_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve">
                        <style>
                            .prefix__st2 {
                                fill: none;
                                stroke: #fff;
                                stroke-width: 2.9537;
                                stroke-linecap: round;
                                stroke-miterlimit: 10
                            }
                        </style>
                        <path id="prefix__Bound" fill="none" d="M0 0h24v24H0z"></path>
                        <path id="prefix__Combined-Shape_00000038379922521257236590000010407855033361335999_" d="M6.1 17.9H1.7c-1-.1-1.5-.6-1.5-1.5s.4-1.3 1.5-1.5H9v7.4c0 1-.4 1.5-1.5 1.5S6 23.4 6 22.3v-4.4zm11.8 0v4.4c-.1 1-.6 1.5-1.5 1.5s-1.3-.4-1.5-1.5V15h7.4c1 0 1.5.4 1.5 1.5s-.4 1.5-1.5 1.5h-4.4zm0-11.8h4.4c1 .1 1.5.6 1.5 1.5s-.4 1.3-1.5 1.4H15V1.7c0-1 .4-1.5 1.5-1.5S18 .6 18 1.7v4.4zm-11.8 0V1.7C6.2.7 6.7.2 7.6.2S8.9.6 9 1.7V9H1.7C.7 9 .2 8.6.2 7.5S.6 6 1.7 6h4.4z" fill="#fff"></path>
                        <path class="prefix__st2" d="M7.3 7.1L1.8 1.7M22.3 22.2l-5.4-5.5M7.3 16.9l-5.5 5.4M22.5 1.7L17 7.1"></path>
                        <circle cx="12" cy="12.1" r="2.2" opacity=".7" fill="#fff"></circle>
                    </svg>
                </button>
            </li>
            <li class="">
                <button type="button" data-action="close-viewer" title="Chiudi" class="btn btn-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g fill-rule="evenodd" clip-rule="evenodd" fill="#fff">
                            <path d="M.616 20.556L20.556.616a2.006 2.006 0 012.828 0c.778.777.778 2.05 0 2.828l-19.94 19.94a2.006 2.006 0 01-2.828 0 2.006 2.006 0 010-2.828z"></path>
                            <path d="M3.444.616l19.94 19.94c.778.778.778 2.05 0 2.828a2.006 2.006 0 01-2.828 0L.616 3.444a2.006 2.006 0 010-2.828 2.006 2.006 0 012.828 0z"></path>
                        </g>
                    </svg>
                </button>
            </li>
        </ul>
    </nav>
</div>
```
FM_Viewer has no dependance. No jQuery, no Bootstrap and icons are self contained svg graphics. You only need its style sheet.

## 1.4. Customizing 
You can customize your FM_Viewer constructing your interface using HTML and modifying stylesheet file.

The example below expose only basic buttons (close viewer, next and previous) with customized icons and allows viewer closing on clicking on backdrop.

```
    <div class="fm-viewer off-screen" id="theViewer" data-action="close-viewer">
        <a href="javascript:;" data-action="close-viewer">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
                <defs>
                    <style>
                        .b {
                            fill: none;
                            stroke: #fff;
                            stroke-linecap: round;
                            stroke-miterlimit: 10;
                            stroke-width: 8.68px;
                        }
                    </style>
                </defs>
                <line class="b" x1="39.9" y1="38.47" x2="140.53" y2="139.1" />
                <line class="b" x1="39.47" y1="139.53" x2="140.1" y2="38.9" />
            </svg>
        </a>
        <a href="javascript:;" data-action="next">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
                <defs>
                    <style>
                        .b {
                            fill: none;
                            stroke: #fff;
                            stroke-linecap: round;
                            stroke-miterlimit: 10;
                            stroke-width: 8.75px;
                        }
                    </style>
                </defs>
                <line class="b" x1="64.84" y1="38.28" x2="115.6" y2="89.03" />
                <line class="b" x1="64.4" y1="140.22" x2="115.6" y2="89.03" />
            </svg>
        </a>
        <a href="javascript:;" data-action="previous">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
                <defs>
                    <style>
                        .b {
                            fill: none;
                            stroke: #fff;
                            stroke-linecap: round;
                            stroke-miterlimit: 10;
                            stroke-width: 8.79px;
                        }
                    </style>
                </defs>
                <line class="b" x1="115.27" y1="38.05" x2="64.29" y2="89.03" />
                <line class="b" x1="115.71" y1="140.45" x2="64.29" y2="89.03" />
            </svg>
        </a>
        <footer><div class="viewer-title d-none"></div></footer>
    </div>
```
Elements functionality and button actions are defined through classes and `data-` attributes:

|Element (CSS selector)|Type|Functionality/Action|
|---|---|---|
|`.fm-viewer`|element|Viewer container (mandatory). Add class `off-screen` if you want that the viewer is initially off screen.|
|`.viewer-title`|element|Title/caption obtained from `title` attribute of `<a>` element. Hidden if empty.|
|`[data-action="close-viewer"]`|button or element|Close the viewer. If added to viewer container itself allows closing viewer clicking the backdrop.|
|`[data-action="download-file"]`|button|Starts file downloading. Available only for same domain files otherwise hidden.|
|`[data-action="previous"]`|button|Shows previous file in gallery.|
|`[data-action="next"]`|button|Shows next file in gallery.|
|`[data-action="fullscreen-on"]`|button|Opens full screen view.|
|`[data-action="fullscreen-off"]`|button|Closes full screen view.|


