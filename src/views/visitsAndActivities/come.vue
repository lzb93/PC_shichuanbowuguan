<script setup>
import { ref, onMounted } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'

const navItems = ref([
  { id: 'ticket', title: '票务信息' },
  { id: 'location', title: '位置及交通' },
  { id: 'notice', title: '入馆提示' },
  { id: 'store', title: '文创商店' }
])

const activeNavItem = ref('location')
const isTop = ref(false)
// 滚动到指定区域
const scrollToSection = (id) => {
  activeNavItem.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 监听滚动，更新当前激活的导航项
const handleScroll = () => {
  if (window.scrollY > 410) {
    isTop.value = true
  } else {
    isTop.value = false
  }
  const sections = navItems.value.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  }))

  const scrollPosition = window.scrollY + 100 // 添加偏移量以提前触发

  for (const section of sections) {
    if (section.element) {
      const offsetTop = section.element.offsetTop
      const offsetBottom = offsetTop + section.element.offsetHeight

      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        activeNavItem.value = section.id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="visit-guide">
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <img src="@/assets/img/other/banner.png" width="100%" alt="banner" />
    </div>
    
    
    <div class="guide-container w1440">
      <!-- 左侧导航 -->
      <div class="left-nav" :class="{ 'op-top': isTop }">
        <h3 class="nav-title">参观指南</h3>
        <ul class="nav-list">
          <li v-for="item in navItems" 
              :key="item.id"
              :class="{ active: activeNavItem === item.id }"
              @click="scrollToSection(item.id)">
            {{ item.title }}
          </li>
        </ul>
      </div>

      <!-- 右侧内容 -->
      <div class="right-content">
        <!-- 基本信息卡片组 -->
        <div class="info-cards">
          <div class="info-card">
            <h4>开放时间</h4>
            <div class="card-content">
              <p>周一至周日</p>
              <p class="time">10:00 ~ 17:00</p>
              <p class="note">17:00停止入场</p>
            </div>
          </div>

          <div class="info-card">
            <h4>门票价格</h4>
            <div class="card-content">
              <p>普通门票</p>
              <p class="price">¥ 30 /人</p>
              <p class="note">参阅优惠政策</p>
            </div>
          </div>

          <div class="info-card">
            <h4>交通方式</h4>
            <div class="card-content">
              <p>地铁：T21路、T40路、T1路</p>
              <p class="station">天府广场站</p>
              <p class="note">B出口1直达</p>
            </div>
          </div>
        </div>

        <!-- 票务信息 -->
        <div id="ticket" class="ticket-info">
          <h3 class="f32 tc">票务信息</h3>
          <div class="display-flex-be mt10">
            <table class="ticket-table">
              <tr>
                <th>票类</th>
                <th>常规票</th>
                <th>学生</th>
              </tr>
              <tr>
                <td>特展</td>
                <td>¥100</td>
                <td>¥50</td>
              </tr>
              <tr>
                <td>儿童展</td>
                <td>¥100</td>
                <td>/</td>
              </tr>
              <tr>
                <td>亲子展</td>
                <td>¥100</td>
                <td>/</td>
              </tr>
            </table>

            <!-- 购票说明 -->
            <div class="ticket-policy">
              <div class="policy-item">
                <h4>购票方法</h4>
                <div class="policy-content">
                  <p>现场购买：参观者可至西岸美术馆一楼服务台购票。</p>
                  <p>在线购买：参观者可至"西岸美术馆"官方微信号在线购票。</p>
                </div>
              </div>

              <div class="policy-item">
                <h4>优惠政策</h4>
                <div class="policy-content">
                  <p>学生持有效证件可以折扣价格购买常规及特展门票。</p>
                </div>
              </div>

              <div class="policy-item">
                <h4>免票政策</h4>
                <div class="policy-content">
                  <ol>
                    <li>一米二以上人免费携带一名身高1.3米以下的儿童入场</li>
                    <li>70岁以上老年人、残障人士、军人（凭有效证明）免费入场。</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 位置及交通 -->
        <section id="location">
          <h3 class="f32 tc">位置及交通</h3>
          <div class="location-info">
            <div class="map-container">
              <img src="@/assets/img/home/banner1.png" alt="位置地图" />
            </div>
            <div class="transport-info">
              <div class="transport-item">
                <img src="@/assets/img/icon/ce1.png" width="60" height="60" alt="公交" />
                <div>
                  <span>公交:</span>
                  <p>乘坐123路、125路、196路至某某站点，沿某某路向西步行200米</p>
                </div>
              </div>
              <div class="transport-item">
                <img src="@/assets/img/icon/ce1.png" width="60" height="60" alt="地铁" />
                <div>
                  <span>地铁:</span>
                  <p>乘坐九号线至环球金融站，由A号出口，沿某某路向西步行100米</p>
                </div>
              </div>
              <div class="transport-item">
                <img src="@/assets/img/icon/ce1.png" width="60" height="60" alt="自驾" />
                <div>
                  <span>自驾:</span>
                  <p>成都市四川少人体闲门3号车场。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 入馆提示 -->
        <section id="notice" class="notice-section">
          <div class="notice-info">
            <h3 class="f32 tc">入馆提示</h3>
            <div class="notice-content">
              <h4 class="tc f24">严正声明</h4>
              <p>四川名人馆本展馆在符合国家法律法规的前提下收集和使用用户信息，以日后能更好地为访问者提供服务。私自传播他人个人信息或从事其他非法活动，此类严重违规的参观者将被追究相应的法律责任。</p>
              
              <h4>为了您有更好的观展体验，请在预约之前仔细阅读本须知</h4>
              <ol>
                <li>开放时间为9:00-18:00(17:00停止入场)，每一时间段需要预约日期时段。</li>
                <li>为保证人员安全有序疏散，预计预约分时段入场及控制同时段观展总量(每天5000人次)。</li>
                <li>预约前请确保个人信息填写正确，如有错误将无法进入四川名人馆公众号参观预约平台进行预约。</li>
                <li>每日限约1次，如不能按预约时间参观，请提前1天取消预约。</li>
              </ol>

              <h4 class="tc f24">其他注意事项</h4>
              <ol>
                <li>请随身携带证件。</li>
                <li>保持场所清洁，文明参观。</li>
                <li>不得携带以下物品：(1)易燃物；(2)水杯不要带；(3)无线耳机为避免打扰其他参观者；(4)携带宠物等。</li>
                <li>保持场所清洁，文明参观。</li>
                <li>保持展厅内适当安全距离和小声社交。</li>
                <li>如有控制群组活动必要时，包括但不限于不能发生对其他参观者造成影响的行为。</li>
                <li>服务时间和开放时间，由日月和天气类型影响和结果，在现场具体情况进行合作的功能服务及特色商品点，如有疑问请咨询。</li>
                <li>服从管理，遵守管理示范并且从展厅工作人员的管理。</li>
                <li>未经允许，请不要对任何人进行录像拍摄。</li>
                <li>如有其它影响公众安全和公共利益的行为。</li>
                <li>如有疑问请拨打订票热线********。</li>
                <li>本规则自2024年2月23日开始执行，如有变更另行通知。</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- 文创商店 -->
        <section id="store" class="store-section">
          <div class="store-info">
            <h3 class="f32 tc">文创商店</h3>
            <p class="f16 color-999"><img class="mr5" style="vertical-align: baseline;" src="@/assets/img/icon/address.png" width="16" height="16" />四川省成都市天府新区雅州路2936号</p>
            <div class="store-grid">
              <div class="store-item">
                <img src="@/assets/img/home/banner1.png" alt="书籍" />
                <h4>书籍</h4>
              </div>
              <div class="store-item">
                <img src="@/assets/img/home/banner1.png" alt="展览衍生" />
                <h4>展览衍生</h4>
              </div>
              <div class="store-item">
                <img src="@/assets/img/home/banner1.png" alt="IP衍生" />
                <h4>IP衍生</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visit-guide {

}
.banner-bg {

}
.breadcrumb-box {
  position: absolute;
  color: #fff;
  margin-left: 240px;
  margin-top: 40px;
}

.guide-container {
  display: flex;
  gap: 40px;
  margin: 0 auto;
  padding: 40px 0;
}

.left-nav {
  background: #fff;
  /* padding: 20px; */
  position: absolute;
  height: fit-content;
}
.op-top {
  position: fixed;
  top: 10px;
}

.nav-title {
  font-size: 28px;
  width: 250px;
  height: 90px;
  line-height: 90px;
  padding-left: 20px;
  color: #fff;
  background: #658A98;
  border: 1px solid #658A98;
}
.nav-list{
  width: 100%;
  border-left: 1px solid #E2E8F0;
  border-right: 1px solid #E2E8F0;
}
.nav-list li {
  position: relative;
  padding: 0px 20px;
  line-height: 72px;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 1px solid #E2E8F0;
}

.nav-list li.active {
  color: #658A98;
}
.nav-list li.active::after {
  content: '';
  display: block;
  width: 4px;
  height: 28px;
  background: #658A98;
  position: absolute;
  left: 0px;
  top: 36px;
  transform: translateY(-50%);
}

/* 右侧内容 */
.right-content {
  width: 100%;
  padding-left: 290px;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.info-card {
  background-image: url('@/assets/img/other/bg.png');
  background-size: 100% 100%;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  font-size: 18px;
}

.info-card h4 {
  font-size: 32px;
  margin-bottom: 15px;
  color: #333;
}

.time, .price, .station {
  font-size: 32px;
  margin: 10px 0;
}

/* 票务信息 */
.ticket-info {
  margin-bottom: 40px;
}

.ticket-table {
  width: 476px;
  border-collapse: collapse;
  font-size: 24px;
}

.ticket-table th {
  background: #F8F8F8;
}

.ticket-table th, .ticket-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.ticket-policy {
  flex: 1;
}

.policy-item {
  margin: 20px 50px;
}

.policy-item h4 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
  position: relative;
  padding-left: 15px;
}

.policy-item h4::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #336998;
  border-radius: 4px;
}

.policy-content {
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  padding-left: 15px;
}

.policy-content p {
  margin-bottom: 8px;
}

.policy-content ol {
  list-style: decimal;
  padding-left: 20px;
}

.policy-content ol li {
  margin-bottom: 8px;
}

/* 位置及交通  */
.location {
  margin-bottom: 40px;
}
.location-info {
  padding: 20px;
  border: 2px solid #E2E8F0;
  border-radius: 2px;
  margin-bottom: 60px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.map-container {
  margin: 20px 0;
  width: 521px;
  height: 358px;
  overflow: hidden;
  
}

.map-container img {
  width: 100%;
  object-fit: cover;
}

.transport-info {
  margin: 20px 30px;
}

.transport-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 20px;
}

.transport-item span {
  color: #999;
  font-size: 18px;
}

/* 入馆提示  */
.notice-section, .store-section {
  font-size: 20px;
}

.notice-content {
  margin-top: 20px;
  margin-bottom: 70px;
  padding: 20px 40px;
  border-top: 4px solid #658A98;
  border-bottom: 4px solid #658A98;
  border-left: 1px solid #658A98;
  border-right: 1px solid #658A98;
}

.notice-content h4 {
  margin: 20px 0 10px;
  color: #333;
  font-weight: bold;
}

.notice-content p, .notice-content li {
  color: #666;
  line-height: 1.8;
  margin-bottom: 10px;
}

.notice-content ol {
  padding-left: 20px;
}

/* 文创商店  */
.color-999 {
  color: #999;
}
.store-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.store-item {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.store-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.store-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.store-item h4 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  text-align: center;
}
</style>
