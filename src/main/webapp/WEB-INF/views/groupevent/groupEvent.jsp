<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
	<head>
		<script src="/js/groupevent/groupEventAttendCancel.js"></script>
		<script src="/js/groupevent/groupEventAttend.js"></script>
		<script src="/js/groupevent/groupEvent.js"></script>
		<script>
			/* js 파일로 주입 */
			var checkGroupMemberCnt = "${checkGroupMemberCnt}";
			var userEventAttendApplyHistory = "${userEventAttendApplyHistory}"
		</script>
		<link rel="stylesheet" type="text/css" href="/css/groupevent/groupEventAttendCancel.css">	
		<link rel="stylesheet" type="text/css" href="/css/groupevent/groupEventAttend.css">	
		<link rel="stylesheet" type="text/css" href="/css/groupevent/groupEvent.css">	
	</head>
	
	<section class="tapPageSection" id="eventTapPageSection">
		<div id="groupEventNavDiv">
			<div id="groupEventNavBtnDiv">
				<button class="groupEventNavBtn clicked" id="eventListBtn">
	        		<span>
	        			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
	        		</span>
	        		<span>
		        		리스트로 보기
		        	</span>
	        	</button>
	            <button class="groupEventNavBtn" id="eventCalenderBtn"> 
	            	<span>
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"/></svg>
	        		</span>
	        		<span>
		        		달력으로 보기
		        	</span>
	            </button>
			</div>
        </div>
        <div id="groupEventPageDiv">
            <div id="groupEventSidebarDiv">
                <button id="upcomingEventBtn" class="clicked">예정된 일정</button>
                <button id="pastEventBtn" class="">지난 일정</button>
            </div>
            <div id="groupEventListDiv">
                <div id="upcomingEventsDiv">
                    <c:choose>
                        <c:when test="${empty upcomingEventList}">
                            <div id="noEventsDiv">예정된 일정이 없습니다.</div>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="event" items="${upcomingEventList}">
							    <div class="eventItemDiv row custom-margin d-flex align-items-stretch mb-3 pt-4 ps-4">
							        <div class="groupEventImageDiv col-md-4 d-flex align-items-center justify-content-center">
							            <img class="eventImg" src="/upload/groupevent/${event.eventImage}" alt="${event.eventName}" class="img-fluid">
							        </div>
							        <div class="groupEventDetailDiv col-md-8 d-flex flex-column justify-content-center">
							            <div id="eventNameDiv">${event.eventName}</div>
							            <div id="eventDateDiv">
							            	<span class="groupEventIconSpan">
							            		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
							            	</span>
							           		<span>
							           			${event.eventDate}
							           		</span>
							           		<span class="groupEventIconSpan eventMemberCntSpan">
												<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Z"/></svg>
							           		</span>
							           		<span>
							           			${event.currentMemberCnt}/${event.eventMaximum}
							           		</span>
							           	</div>
							            <div id="eventLocationDiv">
							            	<span class="groupEventIconSpan">
							            		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm0-120Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Z"/></svg>
							            	</span>
							           		<span>
							           			${event.eventLocation}
							           		</span>
							            </div>
							            <div id="eventDetailDiv">${event.eventDetail}</div>
							        </div>
							        <div class="d-flex pb-0">	  
								        <div class="groupEventAttendMembersDiv" data-eventId="${event.eventId}">
								        	<!-- 일정 참여 신청한 모임원 목록(groupEvent.js) -->
								        </div>
								        <div class="groupEventOptionBtnDiv">
								            <button class="groupEventOptionBtn" data-eventId="${event.eventId}" value=""></button>
								        </div>
							       	</div>
							    </div>
							</c:forEach>
                        </c:otherwise>
                    </c:choose>
                </div>
                <div id="pastEventsDiv" style="display: none;">
                    <c:choose>
                        <c:when test="${empty pastEventList}">
                            <div id="noEventsDiv">지난 일정이 없습니다.</div>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="event" items="${pastEventList}">
							    <div class="eventItemDiv row custom-margin d-flex align-items-stretch mb-3 pt-4 ps-4">
							        <div class="groupEventImageDiv col-md-4 d-flex align-items-center justify-content-center">
							            <img class="eventImg" src="/upload/groupevent/${event.eventImage}" alt="${event.eventName}" class="img-fluid">
							        </div>
							        <div class="groupEventDetailDiv col-md-8 d-flex flex-column justify-content-center">
							            <div id="eventNameDiv">${event.eventName}</div>
							            <div id="eventDateDiv">
							            	<span class="groupEventIconSpan">
							            		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
							            	</span>
							           		<span>
							           			${event.eventDate}
							           		</span>
							           	</div>
							            <div id="eventLocationDiv">
							            	<span class="groupEventIconSpan">
							            		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm0-120Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Z"/></svg>
							            	</span>
							           		<span>
							           			${event.eventLocation}
							           		</span>
							            </div>
							            <div id="eventDetailDiv">${event.eventDetail}</div>
							        </div>
							        <div class="pb-0">
								        <div class="groupEventAttendMembersDiv col-12" data-eventId="${event.eventId}">
								        	<!-- 일정 참여 신청한 모임원 목록(groupEvent.js) -->
								        </div>
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