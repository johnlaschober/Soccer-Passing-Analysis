import random
import sys

list = [11,12,15,16,19,20,22,23,25,29,30]

soccerData = {11: {12:1, 15:0, 16:0, 19:0, 20:0, 22:2, 23:4, 25:1, 29:1, 30:0},
	      12: {11:0, 15:0, 16:3, 19:1, 20:1, 22:2, 23:1, 25:0, 29:4, 30:0},
	      15: {11:1, 12:0, 16:2, 19:3, 20:3, 22:0, 23:3, 25:0, 29:1, 30:1},
	      16: {11:4, 12:1, 15:4, 19:4, 20:2, 22:0, 23:4, 25:0, 29:1, 30:3},
	      19: {11:2, 12:2, 15:1, 16:4, 20:0, 22:5, 23:4, 25:4, 29:1, 30:1},
	      20: {11:1, 12:1, 15:1, 16:3, 19:0, 22:2, 23:2, 25:0, 29:2, 30:2},
	      22: {11:1, 12:2, 15:1, 16:1, 19:1, 20:0, 23:7, 25:1, 29:1, 30:1},
	      23: {11:3, 12:5, 15:0, 16:5, 19:2, 20:0, 22:5, 25:6, 29:3, 30:1},
	      25: {11:0, 12:4, 15:1, 16:1, 19:3, 20:0, 22:3, 23:5, 29:1, 30:0},
	      29: {11:0, 12:4, 15:1, 16:1, 19:1, 20:1, 22:2, 23:3, 25:1, 30:1},
	      30: {11:1, 12:1, 15:1, 16:1, 19:3, 20:1, 22:0, 23:2, 25:2, 29:2}}
####################################
def allPermutationsExcept(inputList, ignore) :
	results = []
	for i in range(5) :
		if inputList[i] != ignore :
			for j in range(5) :
				if j != i and inputList[j] != ignore :
					results.append([inputList[i],inputList[j]])
	return results
####################################


def findShortestPath(sourceNode, targetNode) :
        shouldExit = False
        soccerDataCopy = soccerData.copy()
        while shouldExit == False :
                distanceMap = {}
                S = []
                V = list.copy()
                S.append(sourceNode)
                V.remove(sourceNode)

                distanceMap[sourceNode] = 0
                vertexList = {}
                vertexList[sourceNode] = [sourceNode]
                while len(V) != 0 :
                        minDistance = sys.maxsize
                        foundNode = -1
                        for outerNode in V :
                                for innerNode in S :
                                        # print(adjacencyMap)			
                                        if outerNode in soccerDataCopy[innerNode] and soccerDataCopy[innerNode][outerNode] > 0:
                                                # Calculating the distance from the source node to the outer node
                                                tmpDistance = distanceMap[innerNode ] + 1
                                                
                                                
                                                # Updating the minDistance if we have a new minDistance
                                                if tmpDistance < minDistance :
                                                        # print("minDistance = ", tmpDistance, "for ", innerNode, " connected to ", outerNode)
                                                        minDistance = tmpDistance

                                                        local = vertexList[innerNode].copy()
                                                        local.append(outerNode)
                                                        vertexList[outerNode] = local
                                                        # Setting found node to the outerNode in V
                                                        foundNode = outerNode
                                                        soccerDataCopy[innerNode][outerNode] = soccerDataCopy[innerNode][outerNode] - 1
                        if foundNode == -1 :
                                #print("Could not get from ", sourceNode, "to ", targetNode)
                                shouldExit = True
                                break
                        
                        S.append(foundNode)
                        V.remove(foundNode)	
                        distanceMap[foundNode] = minDistance
                        if foundNode == targetNode :
                                #print("Shortest path from ", sourceNode, " to ", targetNode, " = ", vertexList[targetNode])
                                global totalPaths
                                totalPaths = totalPaths + 1
                                if ignoredVal in vertexList[targetNode] :
                                        #print(ignoredVal, "was in that!")
                                        global totalPathsWithIgnored
                                        totalPathsWithIgnored = totalPathsWithIgnored + 1
                                break        

#print("Looking at betweenness for ", ignoredVal)

ignoredVal = 19 # CHANGE THIS VALUE DUMMY, YOU GO PLAYER BY PLAYER
allPermutations = allPermutationsExcept(list, ignoredVal)
totalPaths = 0
totalPathsWithIgnored = 0
sumTotalPaths = 0
sumTotalPathsWithIgnored = 0
for pair in allPermutations :
        sumTotalPaths += totalPaths
        sumTotalPathsWithIgnored += totalPathsWithIgnored
        totalPaths = 0
        totalPathsWithIgnored = 0
        print("STARTING : ", pair[0], " to ", pair[1])
        findShortestPath(pair[0], pair[1])
        print("Total Paths: ", totalPaths, "----", "Total Paths With Ignored (", ignoredVal, "): ", totalPathsWithIgnored)
print("Betweenness for ", ignoredVal, ": ", (sumTotalPathsWithIgnored/sumTotalPaths))


	
