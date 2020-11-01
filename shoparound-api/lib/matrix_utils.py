from collections import deque, defaultdict


def get_matrix(rows_num, cols_num, shelves):
    matrix = [[0] * cols_num for row in range(rows_num)]
    for (x, y) in shelves:
        matrix[x][y] = 1

    return matrix


def get_dist(start, finish, matrix):
    q = deque()
    q.append(start)

    rows_num = len(matrix)
    cols_num = len(matrix[0])
    prev = defaultdict(dict)
    used = {start}
    while len(q) > 0:
        x, y = q.popleft()

        for dx, dy in [(-1, 0), (1, 0), (0, 1), (0, -1)]:
            nx, ny = x + dx, y + dy

            if 0 <= nx < rows_num and 0 <= ny < cols_num and matrix[nx][ny] == 0 and (nx, ny) not in used:
                used.add((nx, ny))
                q.append((nx, ny))
                prev[nx][ny] = (x, y)

    x, y = finish
    path = []
    while (x, y) != start:
        path.append((x, y))
        if y not in prev[x]:
            raise f"Path not found between: {start} -> {finish}"
        x, y = prev[x][y]
    path.append(start)
    path.reverse()
    return len(path), path


def get_distance_matrix(start, finish, interest, matrix):
    total = len(interest) + 2
    distance_matrix = [[0] * total for row in range(total)]

    nodes = [start, *interest, finish]
    for i, first in enumerate(nodes):
        for j, second in enumerate(nodes):
            distance, _ = get_dist(first, second, matrix)
            distance_matrix[i][j] = distance
    return nodes, distance_matrix


def hamilton_path(distance_matrix):
    node_num = len(distance_matrix)
    dp = [[float('inf')] * node_num for row in range(2 ** node_num)]
    parent = [[None] * node_num for row in range(2 ** node_num)]

    dp[1][0] = 0
    for config in range(1, 2 ** node_num):
        for i in range(0, node_num):
            if not ((config >> i) & 1):
                continue
            if dp[config][i] == float('inf'):
                continue
            for j in range(0, node_num):
                if (config >> j) & 1:
                    continue
                candidate = dp[config][i] + distance_matrix[i][j]
                if candidate < dp[config | (1 << j)][j]:
                    dp[config | (1 << j)][j] = candidate
                    parent[config | (1 << j)][j] = config, i
                dp[config | (1 << j)][j] = min(dp[config | (1 << j)][j], dp[config][i] + distance_matrix[i][j])

    
    node = node_num - 1
    config = 2 ** node_num - 1
    path = [node]
    while node != 0:
        config, node = parent[config][node]
        path.append(node)
    path.reverse()
    return path


def get_path(nodes, index_path, matrix):
    path = [nodes[0]]
    total_cost = 1
    for index in range(len(index_path) - 1):
        interm_dist, interm_path = get_dist(nodes[index_path[index]], nodes[index_path[index + 1]], matrix)
        total_cost += interm_dist - 1
        path.extend(interm_path[1:])

    return total_cost, path
    

def solve_hamiltonian_path(start, finish, interest, matrix):
    nodes, distance_matrix = get_distance_matrix(start, finish, interest, matrix)
    index_path = hamilton_path(distance_matrix)
    total_cost, path = get_path(nodes, index_path, matrix)

    return index_path, total_cost, path
