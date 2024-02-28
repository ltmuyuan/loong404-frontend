
| 测试环境 OP Sepolia Testnet     | address                                         |
|-----------------------------|-------------------------------------------------|
| greatLAddr(大龙token)         | 0x512273384A35D749207Db806cF3E1ed89E5613a3      |
| greatLMintAddr(大龙mint addr) | 0xE20e2EdBb15635c9913ac10D91c717018a82fc71      |
| babyLAddr(小龙token)          | 0xafA0860737Fa278812e7374681bC83bc1b031F51      |
| babyLMintAddr(小龙mint addr)  | 0x376fB81695D3CA27F0A4324f7EbEE2980Fabd785      |
| swapAddress                 | 0x936201bc8eecc9F062b938a9B40Ea25133513d99      |
| dataAddress                 | 0x9514C7DB087458fE82F1f93cFe4229EB38d88F38      |

1. 大小龙mint的时候用(greatLMintAddr，babyLMintAddr):
  - freeMint()：free mint
  - mint(uint256 num,string memory _inviteCode): mint 参数：（个数，邀请码（没有传空串）
  - getClaimAmount(address addr): 获取当天可以claim奖励金额 参数:(账户地址)
  - getInviteRewards(address addr):获取总的邀请奖励数
  - claim(): claim邀请奖励
  - checkFree(address addr): 校验钱包是否可以免费mint 参数:账户地址 返回值:(true:可以free mint,false: 不可free mint)
  - limitMintMap(address addr) 查询已经mint的个数 参数:账户地址 返回值：mint的个数

2. dataStorage(dataAddress):
  - generateInviteCode(string memory _inviteCode)：生成邀请码 参数：（邀请码）（需要前端生成6位邀请码传到参数中）
  - getInviteCode(address addr):  获取邀请吗
  - getInviteCodes():获取所有邀请吗（可校验用户的邀请码是否无效）
  - discountList(address addr) 判断地址是否是白单 参数：账户地址 返回值：number number>0 表示地址是白单
  - buyListAdultL(address addr) 大龙免费已经mint的个数 参数：账户地址 返回值：个数
  - buyListBabyL(address addr) 小龙免费已经mint的个数 参数：账户地址 返回值：个数

3. swap json中:(swapAddress)
  - swap： 1：1交换大小龙 参数:(from(大龙或小龙address), to(大龙或小龙address),amount)

4. 显示free mint的逻辑
![流程图](./image/img.png)