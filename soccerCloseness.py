leftPasses = {11: {12: 1, 15: 0, 16: 0, 19: 0, 20: 0, 22: 2, 23: 4, 25: 1, 29: 1, 30: 0},
	      12: {11: 0, 15: 0, 16: 2, 19: 1, 20: 1, 22: 2, 23: 1, 25: 0, 29: 4, 30: 0},
	      15: {11: 1, 12: 0, 16: 2, 19: 4, 20: 3, 22: 0, 23: 3, 25: 0, 29: 1, 30: 1},
	      16: {11: 4, 12: 0, 15: 4, 19: 4, 20: 2, 22: 0, 23: 3, 25: 0, 29: 1, 30: 3},
	      19: {11: 2, 12: 2, 15: 1, 16: 3, 20: 0, 22: 5, 23: 4, 25: 4, 29: 1, 30: 1},
	      20: {11: 1, 12: 1, 15: 1, 16: 3, 19: 0, 22: 2, 23: 2, 25: 0, 29: 2, 30: 2},
	      22: {11: 1, 12: 2, 15: 1, 16: 1, 19: 1, 20: 0, 23: 7, 25: 1, 29: 1, 30: 1},
	      23: {11: 3, 12: 5, 15: 0, 16: 5, 19: 1, 20: 0, 22: 5, 25: 6, 29: 3, 30: 1},
	      25: {11: 0, 12: 4, 15: 1, 16: 1, 19: 4, 20: 0, 22: 3, 23: 5, 29: 1, 30: 0},
	      29: {11: 0, 12: 4, 15: 1, 16: 1, 19: 1, 20: 1, 22: 2, 23: 3, 25: 1, 30: 1},
	      30: {11: 1, 12: 1, 15: 1, 16: 0, 19: 3, 20: 1, 22: 0, 23: 2, 25: 2, 29: 2}}
avgPos = {}
avgPos[11] = [11.846286486486482, 0.7177837837837832] #x and y
avgPos[12] = [9.278470270270276, -3.678335135135136]
avgPos[15] = [-20.32787567567567, -1.0484270270270268]
avgPos[16] = [-7.925805405405401, 5.11980540540541]
avgPos[19] = [-8.829064864864867, -6.458740540540534]
avgPos[20] = [-2.9884054054054054, 9.561643243243251]
avgPos[22] = [7.028005405405406, 3.821302702702703]
avgPos[23] = [3.6973999999999996, 0.2842054054054057]
avgPos[25] = [-2.4220810810810813, -10.934070270270269]
avgPos[29] = [3.4351621621621633, -1.927383783783784]
avgPos[30] = [-3.4249729729729754, -0.1870054054054051]
avgPos[41] = [0.09005769230769159, 4.194836538461536]
avgPos[43] = [0.014408653846153743, -5.455985576923078]
avgPos[45] = [1.2661971153846172, -1.2284278846153849]
avgPos[46] = [-0.9388125000000008, -3.1633701923076916]
avgPos[47] = [-1.629572115384615, -2.900326923076921]
avgPos[60] = [-5.328403846153845, -1.5993028846153832]
avgPos[61] = [-6.548764423076932, 2.9383221153846133]
avgPos[64] = [-5.603971153846152, -4.296841346153846]
avgPos[65] = [3.2499230769230745, -2.7945528846153826]
avgPos[72] = [11.764100961538473, -0.20207211538461542]
avgPos[73] = [-7.82129807692308, -2.8006778846153844]

import sys
import math


adjacencyMap = {}
for playerId, recipientArray in leftPasses.items() :
    adjacencyMap[playerId] = []
    for recipientId, numPassesToRecipient in recipientArray.items() :
        if numPassesToRecipient > 0 :
            adjacencyMap[playerId].append(recipientId)


teamMembers = [11,12,15,16,19,20,22,23,25,29,30]

def distBetween(node1, node2) :   
    return math.sqrt(pow(avgPos[node2][0] - avgPos[node1][0],2) + pow(avgPos[node2][1] - avgPos[node1][1],2))

for playerId in teamMembers :
    S = []
    V = teamMembers.copy()
    sourceNode = playerId
    S.append(sourceNode)
    V.remove(sourceNode)
    distanceMap = {}
    distanceMap[sourceNode] = 0
    while len(V) != 0 :
            minDist = sys.maxsize
            foundNode = False
            for outerNode in V: 
                    for innerNode in S: 
                            if outerNode in adjacencyMap[innerNode]:
                                    if distanceMap[innerNode] + distBetween(outerNode, innerNode) < minDist:
                                            minDist = distanceMap[innerNode] + distBetween(outerNode, innerNode)
                                            foundNode = True
                    if foundNode :
                            distanceMap[outerNode] = minDist
                            S.append(outerNode)
                            V.remove(outerNode)
                            foundNode = outerNode
                            break
      

    endSum = 0
    for i in S :
            if i in distanceMap.keys() :
                    endSum = endSum + distanceMap[i]

    print("Closeness for ", sourceNode)
    print(1/endSum)
