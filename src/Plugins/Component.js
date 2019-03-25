var Component={
    validateemail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    makeRandomText:function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    datatable:function(tableid){
        $('#'+tableid).DataTable(
            {

                responsive: true,
                keys: true,
                rowGroup: true,
                "orderClasses": true,
                "order": [[ 0, 'asc' ], [ 1, 'asc' ]],
                "orderCellsTop": true,
                "autoWidth": true,
                "ordering": true,
                "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "Tümü"]],
                "iDisplayLength": 5,
                "searching": true,
                "processing": true,
                "info": true,
                destroy:true,
                "lengthChange": true,
                language: {
                    searchPlaceholder: "Kayıtlarda Ara..",
                    "search":"Ara:",
                    "emptyTable":"selaö",
                    "zeroRecords":"Aramanızla Eşleşen Bir Kayıt Bulamadık..",
                    "loadingRecords": "Yükleniyor...",
                    "info":"_TOTAL_  Kayıt Arasında Gösterilen _START_ - _END_  ",
                    "lengthMenu":     "Gösterilecek  Kayıt Sayısı _MENU_ ",
                    "infoFiltered":   "(Toplam _MAX_ Kayıttan Filtrelenen)",
                    paginate: {
                        "next":       "› İleri",
                        "previous":   "‹ Geri"

                    },

                },

            }
        );
    },
    showntf:function(msg){
        if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // Kullanıcı onaylamadı ise tekrar soralım
                if (permission === "granted") {
                    // onaylarsa bilgilendirme bildirimi gönderilecek
                    var notification = new Notification('Öğrenciysen.com', {
                        body:msg,
                        icon: 'http://localhost/usershared/src/assets/img/icons.ico'
                    });
                }
            });
        }
    },
    readFileToBase64: function (file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var binaryFile = "";
                var base64File;
                if (typeof reader.readAsBinaryString == "undefined") {
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        binaryFile += String.fromCharCode(bytes[i]);
                    }
                    base64File = btoa(binaryFile) ;
                } else {
                    base64File = btoa(e.target.result);
                }
                var data = {
                    name: file.name,
                    type: file.type != null ? file.type : file.name.split(".").pop(),
                    size: file.size.toString(),
                    base64: base64File
                };
                resolve(data);
            };
            if (typeof reader.readAsBinaryString != "undefined") {
                reader.readAsBinaryString(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        })

    }
}