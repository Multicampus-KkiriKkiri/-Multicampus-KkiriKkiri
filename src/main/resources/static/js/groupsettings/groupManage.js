$(document).ready(function () {
    // 이미지 파일 선택 시 미리보기
    $("#groupImage").change(function() {
        var file = this.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#preview").attr("src", e.target.result).show();
            };
            reader.readAsDataURL(file);
        }
    });

    // 저장 버튼 클릭 시
    $("#saveGroupButton").click(function() {
        var formData = new FormData($("#groupForm")[0]);
        $.ajax({
            url: $("#groupForm").attr("action"),
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                alert("모임 정보가 저장되었습니다.");
            },
            error: function() {
                alert("저장하는데 문제가 발생했습니다.");
            }
        });
    });

    // 추가 이미지 버튼 클릭 시
    $("#addImageButton").click(function() {
        $("#groupImage").click();
    });

    // 지역 선택 시 구 정보 로드
    $("#groupRegionId").change(function() {
        var regionId = $(this).val();
        $.ajax({
            url: '/groupmanage/getDistricts',
            method: 'POST',
            data: { regionId: regionId },
            success: function(data) {
                $("#groupDistrictId").html(data);
            },
            error: function() {
                alert("구 정보를 불러오는데 실패했습니다.");
            }
        });
    });
});
