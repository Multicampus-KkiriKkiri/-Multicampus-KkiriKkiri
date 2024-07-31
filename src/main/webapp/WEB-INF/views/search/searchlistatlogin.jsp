<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>검색 결과</title>
    <link rel="stylesheet" href="/css/search/searchlist.css" />
    <script src="/jquery-3.7.1.min.js"></script>
    <script src="/js/searchlist/searchlist.js"></script> 
    <script>
        var userRegionId = "${userRegionId}";
        var selectedRegionId = "${map.regionId}";
        var selectedDistrictId = "${map.districtId}";
    </script>
</head>

<body>
    <c:if test="${not empty sessionScope.sessionUserId}">
        <%@ include file="../mainpage/mainHeaderLogin.jsp" %>
    </c:if>
    <c:if test="${empty sessionScope.sessionUserId}">
        <%@ include file="../mainpage/mainHeader.jsp" %>
    </c:if>

    <main>
        <div id="contentContainer">
            <div id="sideContainer">
                <form id="searchForm" action="${searchType}searchatlist" method="get">
                    <div id="filterContainer">
                        <ul>
                            <li>
                                <label for="regions">지역</label>
                                <select id="regions" name="regionId">
                                    <option><!-- ajax로 불러옴 --></option>
                                </select>
                            </li>
                            <li>
                                <label for="districts"></label>
                                <select id="districts" name="districtId">
                                    <option><!-- ajax로 불러옴 --></option>
                                </select>
                            </li>
                            <li>
                                <label for="interests">카테고리</label>
                                <select id="interests" name="interest">
                                    <option value="" <c:if test="${map.interest == null}">selected</c:if>>모두</option>
                                    <option value="문화예술" <c:if test="${map.interest == '문화예술'}">selected</c:if>>문화예술</option>
                                    <option value="액티비티" <c:if test="${map.interest == '액티비티'}">selected</c:if>>액티비티</option>
                                    <option value="푸드/드링크" <c:if test="${map.interest == '푸드/드링크'}">selected</c:if>>푸드/드링크</option>
                                    <option value="자기계발" <c:if test="${map.interest == '자기계발'}">selected</c:if>>자기계발</option>
                                    <option value="기타" <c:if test="${map.interest == '기타'}">selected</c:if>>기타</option>
                                </select>
                            </li>
                            <li>
                                <label for="onlineOffline">온/오프라인</label>
                                <select id="onlineOffline" name="onlineOffline">
                                    <option value="" <c:if test="${map.onlineOffline == null}">selected</c:if>>모두</option>
                                    <option value="온라인" <c:if test="${map.onlineOffline == '온라인'}">selected</c:if>>온라인</option>
                                    <option value="오프라인" <c:if test="${map.onlineOffline == '오프라인'}">selected</c:if>>오프라인</option>
                                </select>
                            </li>
                            <li>
                                <label for="sortOrder">정렬</label>
                                <select id="sortOrder" name="sortOrder">
                                    <option value="new" <c:if test="${map.sortOrder == 'new'}">selected</c:if>>최신순</option>
                                    <option value="old" <c:if test="${map.sortOrder == 'old'}">selected</c:if>>오래된 순</option>
                                </select>
                            </li>
                        </ul>
                    </div>

                    <div id="searchContainer">
                        <ul>
                            <li class="radio-group">
                                <label><input type="radio" name="searchType" value="group" <c:if test="${searchType == 'group'}">checked</c:if>> 모임</label>
                                <label><input type="radio" name="searchType" value="event" <c:if test="${searchType == 'event'}">checked</c:if>> 일정</label>
                            </li>
                            <li class="search-bar">
                                <!-- <label for="keyword"></label> -->
                                <input type="text" id="keyword" name="keyword" placeholder = "검색어" value="${map.keyword}">
                                <button type="submit">검색</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div><!-- sideContainer 끝 -->

            <div id="resultsContainer">
                <c:choose>
                    <c:when test="${not empty groups}">
                        <c:forEach var="data" items="${groups}">
                            <div class="resultContainer" data-groupid="${data.groupId}">
                                <div class="imageContainer">
                                    <img src="/upload/groupregister/${data.groupImage}" alt="${data.groupName}" />
                                </div>
                                <div class="contentContainer">
                                    <div class="infoRow">
                                        <div class="infoItem"><span>${data.interestField}</span></div>
                                        <div class="infoItem"><span>${data.groupType}</span></div>
                                        <c:if test="${data.groupType != '온라인'}">
                                            <div class="infoItem"><span>${data.regionName} ${data.districtName}</span></div>
                                        </c:if>
                                    </div>
                                    <div class="infoRow">
                                        <div class="infoItem"><span>${data.groupName}</span></div>
                                    </div>
                                    <div class="details" data-groupdetail="${data.groupDetail}">
                                        <c:choose>
                                            <c:when test="${fn:length(data.groupDetail) > 200}">
                                                ${fn:escapeXml(fn:substring(data.groupDetail, 0, 200))}...
                                            </c:when>
                                            <c:otherwise>
                                                ${fn:escapeXml(data.groupDetail)}
                                            </c:otherwise>
                                        </c:choose>
                                    </div>
                                    <div class="infoRow">
                                        <div class="infoItem"><span>${data.approvedCount+1}/${data.groupMaximum}</span></div>
                                        <div class="infoItem"><span>${data.groupSignUpType}</span></div>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </c:when>
                    <c:when test="${not empty events}">
                        <c:forEach var="data" items="${events}">
						    <div class="resultContainer" data-groupid="${data.groupId}" data-eventid="${data.eventId}">
						        <div class="imageContainer">
						            <img src="/upload/groupevent/${data.eventImage}" alt="${data.eventName}" />
						        </div>
						        <div class="contentContainer">
						            <div class="infoRow">
						                <div class="infoItem"><span>${data.groupName}</span></div>
						                <div class="infoItem"><span>${fn:replace(data.eventDate, 'T', ' ')}</span></div>
						                <div class="infoItem"><span>${data.participantCount}/${data.eventMaximum}</span></div> <!-- participants 위치 변경 -->
						            </div>
						            <div class="infoRow">
						                <div class="infoItem"><span>${data.eventLocation}</span></div> <!-- eventLocation 위치 변경 -->
						            </div>
						            <div class="infoRow">
						                <div class="infoItem"><span>${data.eventName}</span></div>
						            </div>
						            <div class="details" data-groupdetail="${data.eventDetail}">
						                <c:choose>
						                    <c:when test="${fn:length(data.eventDetail) > 200}">
						                        ${fn:substring(data.eventDetail, 0, 200)}...
						                    </c:when>
						                    <c:otherwise>
						                        ${data.eventDetail}
						                    </c:otherwise>
						                </c:choose>
						            </div>
						        </div>
						    </div>
						</c:forEach>

                    </c:when>
                    <c:otherwise>
                        <p>결과가 없습니다.</p>
                    </c:otherwise>
                </c:choose>

                <div class="pagination">
                    <c:forEach begin="1" end="${totalPages}" var="i">
                        <a href="${pageContext.request.contextPath}/${searchType}searchatlist?keyword=${map.keyword}&regionId=${map.regionId}&districtId=${map.districtId}&interest=${map.interest}&onlineOffline=${map.onlineOffline}&sortOrder=${map.sortOrder}&page=${i}" class="${i == currentPage ? 'active' : ''}">${i}</a>
                    </c:forEach>
                </div><!-- pagination 끝 -->
            </div><!-- resultsContainer 끝 -->
        </div><!-- contentContainer 끝 -->
    </main>

    <footer>
        <%@ include file="../mainpage/mainFooter.jsp" %>
    </footer>
</body>

</html>
