<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
	<head>
		<script src="/js/groupevent/groupEvent.js"></script>
		<link rel="stylesheet" type="text/css" href="/css/groupevent/groupEvent.css">	
	</head>
	
	<section class="tapPageSection" id="eventTapPageSection">
        <div id="groupEventPageDiv">
            <div id="groupEventNavDiv">
                <button>리스트로 보여주기</button>
                <button>달력으로 보여주기</button>
            </div>
            <div id="groupEventSidebarDiv">
                <div><button id="upcomingEventBtn">예정된 일정</button></div>
                <div><button id="pastEventBtn">지난 일정</button></div>
            </div>
            <div id="groupEventListDiv">
                <div id="upcomingEventsDiv">
                    <h2>예정된 일정</h2>
                    <c:choose>
                        <c:when test="${empty upcomingEventList}">
                            <div>예정된 일정이 없습니다.</div>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="event" items="${upcomingEventList}">
							    <div class="eventItemDiv row custom-margin d-flex align-items-stretch mb-3">
							        <div class="groupEventImageDiv col-md-4 d-flex align-items-center justify-content-center">
							            <img class="eventImg" src="/upload/groupevent/${event.eventImage}" alt="${event.eventName}" class="img-fluid">
							        </div>
							        <div class="groupEventDetailDiv col-md-8 d-flex flex-column justify-content-center">
							            <div>${event.eventDate}</div>
							            <div>${event.eventName}</div>
							            <div>${event.eventLocation}</div>
							            <div>${event.eventDetail}</div>
							        </div>
							        <div class="groupEventAttendMembersDiv col-12" data-eventId="${event.eventId}">
							        	<!-- 일정 참여 신청한 모임원 목록(groupEvent.js) -->
							        </div>
							        <div class="groupEventOptionBtnDiv col-12 text-end">
							            <button class="groupEventOptionBtn" data-eventId="${event.eventId}" value=""></button>
							        </div>
							    </div>
							</c:forEach>
                        </c:otherwise>
                    </c:choose>
                </div>
                <div id="pastEventsDiv" style="display: none;">
                    <h2>지난 일정</h2>
                    <c:choose>
                        <c:when test="${empty pastEventList}">
                            <div>지난 일정이 없습니다.</div>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="event" items="${pastEventList}">
							    <div class="eventItemDiv row custom-margin d-flex align-items-stretch mb-3">
							        <div class="groupEventImageDiv col-md-4 d-flex align-items-center justify-content-center">
							            <img class="eventImg" src="/upload/groupevent/${event.eventImage}" alt="${event.eventName}" class="img-fluid">
							        </div>
							        <div class="groupEventDetailDiv col-md-8 d-flex flex-column justify-content-center">
							            <div>${event.eventDate}</div>
							            <div>${event.eventName}</div>
							            <div>${event.eventLocation}</div>
							            <div>${event.eventDetail}</div>
							        </div>
							        <div class="groupEventAttendMembersDiv col-12" data-eventId="${event.eventId}">
							        	<!-- 일정 참여 신청한 모임원 목록(groupEvent.js) -->
							        </div>
							    </div>
							</c:forEach>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </div>
    </section>
</html>