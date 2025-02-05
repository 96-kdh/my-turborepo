// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
    uint256 private count = 0;

    error InvalidCount(uint256 _cnt);

    function readCount() external view returns (uint256 cnt) {
        cnt = count;
    }

    function upCount() external returns (uint256 nextCnt) {
        count += 1;
        return count;
    }

    function upCount(uint256 _cnt) external returns (uint256 nextCnt) {
        count += _cnt;
        return count;
    }

    function writeCount(uint256 _cnt) external returns (uint256 nextCnt) {
        if (_cnt <= count) revert InvalidCount(_cnt);

        count = _cnt;
        return count;
    }
}
