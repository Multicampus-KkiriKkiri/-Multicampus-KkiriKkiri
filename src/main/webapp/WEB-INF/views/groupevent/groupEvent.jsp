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
        <div id="groupEventContainerDiv">
            <div id="groupEventNavDiv">
                <button>리스트로 보여주기</button>
                <button>달력으로 보여주기</button>
            </div>
            <div id="groupEventSidebarDiv">
                <div><button id="futureEventBtn">예정된 일정</button></div>
                <div><button id="pastEventBtn">지난 일정</button></div>
            </div>
            <div id="groupEventListDiv">
                <div id="futureEventsDiv" style="display: block;">
                    <h2>예정된 일정</h2>
                    <c:choose>
                        <c:when test="${empty futureEventList}">
                            <div>예정된 일정이 없습니다.</div>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="event" items="${futureEventList}">
                                <div id="groupEventImageDiv"><img id="eventImg" src="${event.eventImage}" alt="${event.eventName}"></div>
                                <div id="groupEventDescriptionDiv">
                                    <div>${event.eventName}</div>
                                    <div>${event.eventDetail}</div>
                                </div>
                                <div id="groupEventDetailDiv">
                                    <div>${event.eventDate}</div>
                                    <div>${event.eventLocation}</div>
                                </div>
                                <div id="groupEventMembersDiv">
                                   참여멤버<%--  ${event.members} --%>
                                </div>
                                <div id="groupEventJoinBtnDiv">
                                    <button>참여 신청</button>
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
                                <div id="groupEventImageDiv"><img id="eventImg" src="${event.eventImage}" alt="${event.eventName}"></div>
                                <div id="groupEventDescriptionDiv">
                                    <div>${event.title}</div>
                                    <div>${event.description}</div>
                                </div>
                                <div id="groupEventDetailDiv">
                                    <div>${event.startDateTime}</div>
                                    <div>${event.location}</div>
                                </div>
                                <div id="groupEventMembersDiv">
                                    ${event.members}
                                </div>
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </div>
    </section>
</html>