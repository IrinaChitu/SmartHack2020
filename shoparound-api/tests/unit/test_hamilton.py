import pytest

from lib import matrix_utils

@pytest.fixture(scope="module")
def rows_num():
    return 6

@pytest.fixture(scope="module")
def cols_num():
    return 11

@pytest.fixture(scope="module")
def start_pos():
    return (5, 1)

@pytest.fixture(scope="module")
def finish_pos():
    return (2, 10)

@pytest.fixture(scope="module")
def shelves():
    return [(1, 1), (1, 2), (1, 3), (1, 4), (2, 1), (2, 2), (2, 3), (2, 4), (1, 7), (1, 8), (1, 9), (4, 2), (4, 3), (4, 7), (4, 8), (4, 9)]

@pytest.fixture(scope="module")
def interest():
    return [(0, 4), (0, 8), (2, 0), (3, 2), (3, 8), (5, 2), (5, 9)]

@pytest.fixture(scope="module")
def expected_cost():
    return 35

def test_hamilton_path(rows_num, cols_num, start_pos, finish_pos, shelves, interest, expected_cost):
    # GIVEN
    matrix = matrix_utils.get_matrix(rows_num, cols_num, shelves)

    # WHEN
    total_cost, path = matrix_utils.solve_hamiltonian_path(start_pos, finish_pos, interest, matrix)

    # THEN
    assert total_cost <= expected_cost
    assert len(path) == total_cost
    assert path[0] == start_pos
    assert path[-1] == finish_pos
    for i in range(total_cost - 1):
        x, y = path[i]
        assert 0 <= x < rows_num
        assert 0 <= y < cols_num
        assert matrix[x][y] == 0
        nx, ny = path[i + 1]
        assert 0 <= nx < rows_num
        assert 0 <= ny < cols_num
        assert matrix[nx][ny] == 0
        assert (x == nx and abs(y - ny) == 1) or (y == ny and abs(x - nx) == 1)