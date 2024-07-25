<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>      
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 

<!-- Group Results -->
<c:choose>
    <c:when test="${not empty groups}">
        <c:forEach var="data" items="${groups}">
            <div class="resultContainer">
                <div class="groupImage">
                    <img src="${data.groupImage}" alt="${data.groupName}" width="100"/>
                </div>
                <div class="interestField">${data.interestField}</div>
                <div class="groupType">${data.groupType}</div>
                <div class="groupLocation">${data.regionName} ${data.districtName}</div>
                <div class="groupName">${data.groupName}</div>
                <div class="groupDetail">${data.groupDetail}</div>
                <div class="groupParticipants">${data.approvedCount}/${data.groupMaximum}</div>
                <div class="groupSignUpType">${data.groupSignUpType}</div>
            </div>
        </c:forEach>
    </c:when>
    <c:when test="${not empty events}">
        <c:forEach var="data" items="${events}">
            <div class="resultContainer">
                <div class="eventImage">
                    <img src="${data.eventImage}" alt="${data.eventName}" width="100"/>
                </div>
                <div class="groupName">${data.groupName}</div>
                <div class="eventDate">${data.eventDate}</div>
                <div class="eventLocation">${data.eventLocation}</div>
                <div class="eventName">${data.eventName}</div>
                <div class="eventDetail">${data.eventDetail}</div>
                <div class="eventParticipants">${data.participantCount}/${data.eventMaximum}</div>
            </div>
        </c:forEach>
    </c:when>
</c:choose>

<!-- Pagination -->
<div class="pagination">
    <c:forEach begin="1" end="${totalPages}" var="i">
        <a href="javascript:void(0);" onclick="loadPage(${i})" class="${i == currentPage ? 'active' : ''}">${i}</a>
    </c:forEach>
</div>
