
| 测试环境 Sepolia Testnet | address                                         |
|----------|-------------------------------------------------|
| mint     | 0x6373F1Cc2e32670A4C5FC538609BE2423cEE4a00      |
| big      | 0x789244D520e75d6683cCcf82179E6e0E7dD0E6d7      |
| little   | 0x5355b03aA830AC9D171B436C1f620A27C73A5B17      |
| swap     | 0x56CC8Ce20606492eE4c96F396577d70A52db8518      |

mint json中：
freeMintAdultLoong：free mint大龙
freeMintBabyLoong：free mint小龙
mintAdultLoong: mint 大龙 参数：（个数，邀请码（没有传空串））
mintBabyLong： mint小龙 参数：（个数，邀请码（没有传空串））
generateInviteCode：生成邀请码 参数：（邀请码）（需要前端生成6位邀请码传到参数中）
claim:  claim邀请人的奖励

swap json中：
swap： 1：1交换大小龙 参数:(from(大龙或小龙address), to(大龙或小龙address),amount)