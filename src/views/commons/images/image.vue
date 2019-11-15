<template>
    <div ref="imgDiv"></div>
</template>

<script>
import store from '@/store'

export default {
    props: {
        url: String
    },
    data() {
        return {
        
        };
    },
    watch:{
        url(){
            this.getData();
        }
    },
    methods:{
        getBase64Image(imgUrl) {
            var vm = this;
            window.URL = window.URL || window.webkitURL;
            var xhr = new XMLHttpRequest();
            xhr.open("get", imgUrl, true);
            var str = store.state.user.passport + ':' + store.state.user.passwd;
            var auth =  'Basic ' + btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, 
                                                                        function (match, p1) {
                                                                            return String.fromCharCode('0x' + p1)
                                                                        }))
            xhr.responseType = "blob";
            xhr.setRequestHeader("Authorization", auth);
            xhr.onload = function () {
                if (this.status == 200) {
                    var blob = this.response;
                    let oFileReader = new FileReader();
                    oFileReader.onloadend = function (e) {
                        let base64 = e.target.result;
                    };
                    oFileReader.readAsDataURL(blob);
                    var img = document.createElement("img");
                    img.onload = function (e) {
                        window.URL.revokeObjectURL(img.src);
                    };
                    let src = window.URL.createObjectURL(blob);
                    img.src = src;
                    vm.$refs.imgDiv.innerHTML = '';
                    vm.$refs.imgDiv.appendChild(img);
                }
            }
            xhr.send();
        },
        getData(){
            this.getBase64Image(this.url);
        }
    },

    mounted() {
        this.getData();
    }
}
</script>
