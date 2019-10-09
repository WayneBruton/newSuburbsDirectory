<template>
  <div>
    <br />
    <br />
    <h1>Business Listings</h1>
    <div class="mainDiv" >
      <div
       class="displayMap"
        id="map"
        style="display:flex; flex-direction: column; justify-content: flex-start;  padding: 5px;"
      >
        <div
          style="display:flex; justify-content: flex-start; width: 100%; align-items: center; margin-top: 30px;"
        >
          <img
            ref="map"
            src="../assets/recoloredSuburbs.png"
            usemap="#image-map"
            style=" width: 70%"
            hidefocus="true"
          />

          <map name="image-map">
            <area
              id="8"
              @click="chooseArea($event)"
              target
              alt="West Coast"
              title="West Coast"
              :coords="westcoast"
              shape="poly"
            />
            <area
              id="5"
              @click="chooseArea($event)"
              target
              alt="Northern Suburbs"
              title="Northern Suburbs"
              :coords="northernsuburbs"
              shape="poly"
            />
            <area
              id="4"
              @click="chooseArea($event)"
              target
              alt="HelderBurg"
              title="HelderBurg"
              :coords="helderberg"
              shape="poly"
            />
            <area
              id="0"
              target
              alt="Cape Flats"
              title="Cape Flats"
              :coords="capeflats"
              shape="poly"
            />
            <area
              id="7"
              @click="chooseArea($event)"
              target
              alt="Southern Suburbs"
              title="Southern Suburbs"
              :coords="southernsuburbs"
              shape="poly"
            />
            <area
              id="3"
              @click="chooseArea($event)"
              target
              alt="City Bowl"
              title="City Bowl"
              :coords="citybowl"
              shape="poly"
            />
            <area
              id="1"
              @click="chooseArea($event)"
              target
              alt="Atlantic Seaboard"
              title="Atlantic Seaboard"
              :coords="atlanticseaboard"
              shape="poly"
            />
            <area
              id="6"
              @click="chooseArea($event)"
              target
              alt="South Peninsula"
              title="South Peninsula"
              :coords="southpeninsula"
              shape="poly"
            />
          </map>
        </div>
      </div>
      <div class="mobileStyles">
        <div class="explain">
          <p>
            <strong>HELP! Where do I click?</strong>
            <br />
            <br />You have got two options here, if you’re feeling adventurous you can
            hover your mouse over the Suburbs on the map to your left... once
            you’re on the Suburb of your choice just click, and you’ll be
            whisked away to our business categories! Not one for fun and games?
            Don’t worry, we’ve got you covered, all you’ve got to do is click
            your chosen Suburb from the list on the right and boom, you’ll be
            taken to our business categories too.
          </p>
        </div>
        <div>
          <ul style="display: flex; justify-content: space-around; flex-wrap: wrap; width: 100%;">
            <li v-for="(area, i) in areas" :key="i" style="width: 100%; margin: 1px;">
              <v-btn
                class="buttons"
                :id="area.id"
                light
                color="#F4EBDE"
                @click="chooseArea($event)"
              >{{ area.area_description }}</v-btn>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DirectoryService from "@/services/DirectoryServices.js";
export default {
  data() {
    return {
      areas: null,
      westcoast:
        "666, 215, 651, 259, 631, 294, 598, 331, 559, 359, 513, 366, 491, 351, 469, 346, 407, 416, 390, 440, 399, 471, 386, 491, 370, 491, 342, 513, 340, 541, 361, 559, 399, 598, 403, 627, 392, 646, 421, 657, 440, 675, 443, 692, 464, 725, 489, 723, 565, 839, 592, 892, 611, 933, 640, 1012, 640, 1074, 613, 1102, 629, 1120, 631, 1170, 629, 1194, 642, 1216, 651, 1251, 679, 1315, 699, 1359, 727, 1426, 773, 1510, 778, 1575, 778, 1602, 758, 1624, 710, 1733, 734, 1744, 756, 1735, 780, 1729, 819, 1689, 804, 1663, 850, 1610, 876, 1591, 881, 1538, 909, 1431, 925, 1365, 927, 1291, 922, 1199, 914, 1107, 916, 1043, 938, 933, 955, 865, 975, 841, 1054, 699, 1102, 600, 1003, 559, 990, 535, 992, 515, 1019, 495, 1021, 458, 1001, 408, 966, 383, 922, 403, 885, 394, 861, 379, 865, 346, 863, 322, 843, 302, 813, 270, 769, 241, 736, 226, 686, 210",
      northernsuburbs:
        "1128, 600, 1104, 624, 1071, 690, 1054, 721, 1030, 765, 971, 870, 955, 914, 949, 953, 929, 1006, 929, 1065, 925, 1115, 938, 1194, 942, 1326, 942, 1359, 905, 1490, 894, 1536, 894, 1591, 874, 1619, 852, 1628, 811, 1663, 826, 1683, 819, 1707, 802, 1729, 780, 1738, 747, 1749, 743, 1768, 778, 1808, 784, 1832, 776, 1843, 789, 1847, 817, 1849, 881, 1805, 922, 1814, 929, 1847, 951, 1865, 988, 1880, 1047, 1935, 1073, 1957, 1152, 2003, 1198, 2031, 1339, 2097, 1354, 2066, 1367, 2049, 1450, 2022, 1455, 2005, 1466, 1990, 1483, 1985, 1499, 1981, 1483, 1968, 1448, 1930, 1457, 1908, 1455, 1895, 1461, 1876, 1490, 1812, 1391, 1759, 1413, 1694, 1461, 1654, 1492, 1637, 1518, 1643, 1496, 1584, 1499, 1538, 1516, 1514, 1520, 1464, 1564, 1444, 1619, 1400, 1604, 1376, 1610, 1350, 1630, 1339, 1678, 1286, 1623, 1225, 1674, 1203, 1683, 1177, 1676, 1135, 1737, 1115, 1707, 1071, 1715, 1032, 1702, 1023, 1700, 1039, 1680, 1043, 1661, 1021, 1641, 1021, 1634, 951, 1634, 925, 1645, 907, 1665, 887, 1711, 802, 1654, 782, 1628, 776, 1610, 806, 1601, 822, 1566, 824, 1553, 839, 1560, 852, 1534, 879, 1529, 909, 1488, 949, 1468, 953, 1409, 916, 1393, 929, 1339, 922, 1341, 890, 1317, 852, 1282, 815, 1242, 776, 1229, 773, 1203, 773, 1157, 732, 1141, 681, 1133, 664",
      helderberg:
        "1466, 2003, 1472, 2025, 1389, 2060, 1369, 2068, 1356, 2101, 1393, 2128, 1439, 2152, 1453, 2163, 1446, 2182, 1459, 2202, 1488, 2231, 1501, 2252, 1503, 2272, 1490, 2290, 1507, 2303, 1531, 2307, 1558, 2314, 1591, 2323, 1628, 2336, 1665, 2355, 1689, 2373, 1711, 2408, 1737, 2441, 1764, 2461, 1790, 2498, 1818, 2535, 1856, 2572, 1834, 2596, 1810, 2616, 1779, 2629, 1750, 2647, 1731, 2660, 1713, 2682, 1715, 2715, 1733, 2728, 1750, 2750, 1759, 2778, 1753, 2792, 1775, 2816, 1792, 2824, 1803, 2842, 1812, 2862, 1816, 2881, 1818, 2912, 1810, 2938, 1794, 2958, 1805, 2965, 1829, 2956, 1849, 2930, 1882, 2890, 1873, 2857, 1880, 2829, 1899, 2827, 1926, 2842, 1943, 2818, 1932, 2787, 1974, 2772, 1985, 2756, 2020, 2750, 2029, 2732, 2029, 2717, 2099, 2664, 2101, 2634, 2121, 2629, 2154, 2596, 2140, 2575, 2125, 2555, 2119, 2535, 2112, 2520, 2057, 2509, 2077, 2480, 2088, 2456, 2110, 2428, 2125, 2399, 2147, 2375, 2173, 2351, 2193, 2331, 2213, 2314, 2239, 2292, 2217, 2246, 2206, 2211, 2193, 2178, 2178, 2154, 2151, 2123, 2123, 2095, 2094, 2068, 2040, 2042, 2020, 2038, 2011, 2047, 2002, 2055, 2013, 2068, 2009, 2082, 1978, 2097, 1948, 2112, 1924, 2125, 1908, 2145, 1891, 2152, 1869, 2152, 1829, 2141, 1840, 2152, 1836, 2169, 1823, 2174, 1810, 2180, 1794, 2189, 1779, 2202, 1764, 2204, 1748, 2189, 1733, 2176, 1720, 2171, 1709, 2178, 1696, 2187, 1696, 2200, 1704, 2211, 1702, 2224, 1691, 2239, 1674, 2242, 1661, 2226, 1641, 2222, 1621, 2222, 1595, 2200, 1573, 2191, 1555, 2176, 1542, 2160, 1523, 2139, 1505, 2125, 1499, 2106, 1494, 2082, 1501, 2064, 1505, 2049, 1501, 2033, 1492, 2020, 1483, 2005",
      capeflats:
        "879, 1814, 833, 1847, 830, 1860, 830, 1882, 817, 1898, 789, 1887, 800, 1902, 806, 1917, 806, 1939, 808, 1954, 819, 1970, 835, 1976, 854, 2011, 870, 2042, 876, 2068, 885, 2093, 881, 2112, 887, 2139, 892, 2167, 863, 2191, 843, 2209, 830, 2215, 824, 2244, 787, 2259, 791, 2279, 791, 2305, 804, 2320, 804, 2342, 819, 2353, 833, 2358, 854, 2353, 894, 2351, 944, 2329, 977, 2323, 1019, 2314, 1091, 2296, 1166, 2283, 1216, 2277, 1258, 2281, 1295, 2279, 1325, 2285, 1356, 2279, 1385, 2274, 1407, 2274, 1439, 2279, 1468, 2281, 1488, 2266, 1477, 2242, 1455, 2220, 1435, 2191, 1439, 2160, 1398, 2141, 1350, 2117, 1304, 2095, 1260, 2079, 1207, 2047, 1172, 2033, 1135, 2009, 1109, 2001, 1076, 1983, 1054, 1959, 966, 1887, 938, 1878, 916, 1858, 914, 1841, 916, 1823, 896, 1816",
      southernsuburbs:
        "727, 1759, 708, 1755, 694, 1770, 684, 1784, 677, 1795, 686, 1812, 701, 1825, 705, 1845, 708, 1862, 701, 1873, 686, 1878, 684, 1893, 675, 1906, 664, 1919, 653, 1928, 627, 1935, 587, 1915, 550, 1950, 561, 1968, 565, 1983, 556, 1996, 543, 2009, 526, 2020, 524, 2038, 524, 2055, 530, 2075, 537, 2095, 526, 2112, 521, 2130, 515, 2143, 519, 2158, 528, 2178, 535, 2196, 550, 2202, 563, 2220, 572, 2200, 585, 2191, 602, 2193, 618, 2202, 633, 2213, 620, 2226, 598, 2239, 585, 2248, 567, 2257, 556, 2266, 552, 2283, 552, 2303, 570, 2318, 585, 2312, 600, 2312, 613, 2323, 629, 2325, 646, 2320, 659, 2316, 648, 2301, 659, 2290, 675, 2292, 690, 2301, 697, 2288, 712, 2288, 732, 2290, 747, 2296, 762, 2312, 773, 2303, 780, 2288, 773, 2272, 769, 2257, 778, 2248, 793, 2239, 813, 2239, 815, 2217, 817, 2204, 835, 2193, 846, 2176, 874, 2160, 865, 2132, 865, 2114, 868, 2093, 859, 2073, 861, 2051, 848, 2027, 824, 1981, 795, 1968, 793, 1935, 787, 1917, 776, 1895, 780, 1878, 793, 1876, 815, 1884, 819, 1871, 804, 1860, 784, 1856, 769, 1847, 762, 1830, 767, 1816, 751, 1803, 736, 1777",
      citybowl:
        "705, 1742, 692, 1733, 679, 1731, 664, 1742, 646, 1753, 624, 1753, 596, 1738, 578, 1724, 570, 1711, 574, 1689, 554, 1685, 530, 1683, 508, 1689, 513, 1703, 532, 1711, 541, 1722, 537, 1735, 528, 1749, 521, 1764, 508, 1779, 502, 1790, 502, 1803, 510, 1812, 524, 1819, 537, 1823, 554, 1838, 574, 1832, 596, 1812, 611, 1805, 627, 1805, 651, 1816, 666, 1812, 659, 1797, 666, 1779, 684, 1762, 692, 1753",
      atlanticseaboard:
        "528, 1724, 500, 1711, 480, 1731, 462, 1749, 449, 1766, 438, 1784, 453, 1803, 447, 1819, 434, 1830, 443, 1845, 445, 1860, 440, 1882, 434, 1906, 432, 1928, 421, 1952, 399, 1968, 379, 1983, 355, 1996, 346, 2033, 337, 2064, 357, 2053, 370, 2038, 392, 2018, 423, 2029, 436, 2020, 453, 2018, 458, 1992, 464, 1959, 478, 1939, 464, 1926, 456, 1906, 462, 1882, 473, 1854, 482, 1827, 491, 1803, 489, 1781, 504, 1766, 519, 1749",
      southpeninsula:
        "447, 2027, 438, 2038, 423, 2042, 397, 2027, 379, 2042, 370, 2053, 340, 2077, 320, 2088, 320, 2103, 305, 2117, 285, 2128, 263, 2132, 274, 2143, 269, 2158, 245, 2169, 259, 2171, 274, 2178, 289, 2193, 298, 2211, 320, 2228, 335, 2235, 351, 2220, 357, 2198, 375, 2189, 388, 2191, 405, 2215, 418, 2233, 421, 2257, 412, 2281, 397, 2296, 383, 2318, 383, 2336, 372, 2351, 388, 2362, 397, 2380, 394, 2412, 377, 2437, 377, 2467, 370, 2485, 346, 2485, 333, 2491, 318, 2502, 287, 2511, 296, 2524, 278, 2540, 291, 2557, 307, 2577, 315, 2594, 326, 2623, 337, 2636, 364, 2632, 372, 2649, 397, 2658, 410, 2678, 423, 2706, 432, 2726, 421, 2739, 429, 2752, 440, 2770, 445, 2794, 456, 2816, 453, 2840, 443, 2859, 451, 2877, 453, 2897, 462, 2925, 464, 2949, 458, 2976, 478, 2993, 495, 3017, 513, 3041, 524, 3065, 532, 3089, 515, 3105, 535, 3109, 548, 3118, 565, 3142, 581, 3166, 600, 3182, 620, 3190, 646, 3197, 664, 3199, 681, 3223, 692, 3236, 710, 3245, 723, 3263, 736, 3254, 758, 3254, 773, 3256, 747, 3238, 730, 3230, 716, 3219, 705, 3201, 694, 3184, 692, 3164, 679, 3151, 684, 3129, 677, 3096, 688, 3076, 697, 3061, 697, 3043, 703, 3026, 716, 3013, 719, 2991, 694, 2973, 694, 2954, 703, 2938, 712, 2925, 716, 2905, 712, 2886, 714, 2870, 723, 2855, 719, 2833, 705, 2820, 692, 2802, 686, 2778, 673, 2750, 659, 2728, 644, 2706, 629, 2699, 607, 2695, 587, 2699, 576, 2686, 578, 2667, 587, 2647, 594, 2625, 605, 2601, 609, 2583, 616, 2564, 620, 2546, 607, 2531, 605, 2515, 611, 2496, 624, 2485, 640, 2478, 655, 2465, 668, 2447, 690, 2426, 712, 2401, 734, 2388, 751, 2380, 778, 2373, 802, 2360, 789, 2351, 787, 2325, 787, 2309, 771, 2325, 758, 2325, 740, 2307, 723, 2298, 703, 2294, 697, 2305, 684, 2312, 668, 2296, 670, 2316, 653, 2327, 633, 2329, 609, 2329, 589, 2318, 574, 2329, 554, 2318, 541, 2301, 537, 2279, 543, 2259, 554, 2248, 574, 2235, 596, 2226, 613, 2209, 598, 2198, 583, 2200, 576, 2213, 561, 2224, 546, 2224, 535, 2206, 521, 2193, 515, 2176, 504, 2145, 504, 2128, 510, 2103, 519, 2084, 515, 2064, 495, 2055, 475, 2055, 464, 2042"
    };
  },
  mounted() {
    this.areas = this.$store.state.areas;
    console.log(this.areas);
    setTimeout(() => {
      let oldWidth = this.$refs.map.naturalWidth;
      // let oldHeight = this.$refs.map.naturalHeight;
      let newWidth = this.$refs.map.width;
      // let newHeight = this.$refs.map.height;
      let westcoast = this.westcoast.split(", ");
      let newwestcoast = [];
      let i = 0;
      let ratio = newWidth / oldWidth;
      for (i = 0; i < westcoast.length; i++) {
        newwestcoast.push(parseInt(westcoast[i]) * ratio);
      }
      let newwestcoastCoords = "";
      newwestcoast.forEach((el, index) => {
        if (index !== newwestcoast.length - 1) {
          newwestcoastCoords = newwestcoastCoords + el + ", ";
        } else {
          newwestcoastCoords = newwestcoastCoords + el;
        }
      });
      this.westcoast = newwestcoastCoords;

      // NORTHERN SUBURBS
      let northernsuburbs = this.northernsuburbs.split(", ");
      let newnorthernsuburbs = [];
      i = 0;
      for (i = 0; i < northernsuburbs.length; i++) {
        newnorthernsuburbs.push(parseInt(northernsuburbs[i]) * ratio);
      }
      let newnorthernsuburbsCoords = "";
      newnorthernsuburbs.forEach((el, index) => {
        if (index !== newnorthernsuburbs.length - 1) {
          newnorthernsuburbsCoords = newnorthernsuburbsCoords + el + ", ";
        } else {
          newnorthernsuburbsCoords = newnorthernsuburbsCoords + el;
        }
      });
      this.northernsuburbs = newnorthernsuburbsCoords;

      // HELDERBEG
      let helderberg = this.helderberg.split(", ");
      let newhelderberg = [];
      i = 0;
      for (i = 0; i < helderberg.length; i++) {
        newhelderberg.push(parseInt(helderberg[i]) * ratio);
      }
      let newhelderbergCoords = "";
      newhelderberg.forEach((el, index) => {
        if (index !== newhelderberg.length - 1) {
          newhelderbergCoords = newhelderbergCoords + el + ", ";
        } else {
          newhelderbergCoords = newhelderbergCoords + el;
        }
      });
      this.helderberg = newhelderbergCoords;

      // CAPE FLATS
      let capeflats = this.capeflats.split(", ");
      let newcapeflats = [];
      i = 0;
      for (i = 0; i < capeflats.length; i++) {
        newcapeflats.push(parseInt(capeflats[i]) * ratio);
      }
      let newcapeflatsCoords = "";
      newcapeflats.forEach((el, index) => {
        if (index !== newcapeflats.length - 1) {
          newcapeflatsCoords = newcapeflatsCoords + el + ", ";
        } else {
          newcapeflatsCoords = newcapeflatsCoords + el;
        }
      });
      this.capeflats = newcapeflatsCoords;

      // SOUTHERN SUBURBS
      let southernsuburbs = this.southernsuburbs.split(", ");
      let newsouthernsuburbs = [];
      i = 0;
      for (i = 0; i < southernsuburbs.length; i++) {
        newsouthernsuburbs.push(parseInt(southernsuburbs[i]) * ratio);
      }
      let newsouthernsuburbsCoords = "";
      newsouthernsuburbs.forEach((el, index) => {
        if (index !== newsouthernsuburbs.length - 1) {
          newsouthernsuburbsCoords = newsouthernsuburbsCoords + el + ", ";
        } else {
          newsouthernsuburbsCoords = newsouthernsuburbsCoords + el;
        }
      });
      this.southernsuburbs = newsouthernsuburbsCoords;

      // CITY BOWL
      let citybowl = this.citybowl.split(", ");
      let newcitybowl = [];
      i = 0;
      for (i = 0; i < citybowl.length; i++) {
        newcitybowl.push(parseInt(citybowl[i]) * ratio);
      }
      let newcitybowlCoords = "";
      newcitybowl.forEach((el, index) => {
        if (index !== newcitybowl.length - 1) {
          newcitybowlCoords = newcitybowlCoords + el + ", ";
        } else {
          newcitybowlCoords = newcitybowlCoords + el;
        }
      });
      this.citybowl = newcitybowlCoords;

      // ATLANTIC SEABOARD
      let atlanticseaboard = this.atlanticseaboard.split(", ");
      let newatlanticseaboard = [];
      i = 0;
      for (i = 0; i < atlanticseaboard.length; i++) {
        newatlanticseaboard.push(parseInt(atlanticseaboard[i]) * ratio);
      }
      let newatlanticseaboardCoords = "";
      newatlanticseaboard.forEach((el, index) => {
        if (index !== newatlanticseaboard.length - 1) {
          newatlanticseaboardCoords = newatlanticseaboardCoords + el + ", ";
        } else {
          newatlanticseaboardCoords = newatlanticseaboardCoords + el;
        }
      });
      this.atlanticseaboard = newatlanticseaboardCoords;

      // SOUTH PENINSULA
      let southpeninsula = this.southpeninsula.split(", ");
      let newsouthpeninsula = [];
      i = 0;
      for (i = 0; i < southpeninsula.length; i++) {
        newsouthpeninsula.push(parseInt(southpeninsula[i]) * ratio);
      }
      let newsouthpeninsulaCoords = "";
      newsouthpeninsula.forEach((el, index) => {
        if (index !== newsouthpeninsula.length - 1) {
          newsouthpeninsulaCoords = newsouthpeninsulaCoords + el + ", ";
        } else {
          newsouthpeninsulaCoords = newsouthpeninsulaCoords + el;
        }
      });
      this.southpeninsula = newsouthpeninsulaCoords;
    }, 250);
  },

  methods: {
    chooseArea: function(event) {
      let targetId = parseInt(event.currentTarget.id);
      console.log(targetId);
      let area = this.areas.filter(el => {
        return el.id === targetId;
      });
      this.$store.dispatch("setAreaChosen", area);
      this.$router.push({ name: "directory" });
      this.areaChange(targetId);
    },
    async areaChange(area) {
      await DirectoryService.categories(area)
        .then(response => {
          // console.log(response)
          this.categories = response.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$store.dispatch("setCategories", this.categories);
    }
  }
};
</script>
<style scoped>
img[usemap]
/* map area {
  outline: none;
} */
/* area:hover {
  cursor: pointer;
} */
area {
  outline: none;
}
li {
  list-style: none;
}
.buttons {
  width: 40%;
}
.mobileStyles {
  display: flex;
  flex-direction: column;
  background-color: #f2f6f5;
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #f2f6f5;
  border-radius: 7px;
}
.mainDiv {
  display: flex;
}
@media screen and (max-width: 768px) {
  .explain {
    display: none;
  }
  .buttons {
    width: 85%;
    padding-left: 0%;
  }
  ul {
    align-content: flex-start;
    align-items: flex-start;
    padding-left: 0%;
  }
  .mobileStyles {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    background-color: #f2f6f5;
    margin-top: 10px;
    margin-left: 0px;
    padding: 2px;
    border: 1px solid #f2f6f5;
    border-radius: 7px;
  }
  .displayMap {
    display: none;
  }
  .mainDiv {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  margin: 0%;
}
img {
  display: none;
}
}
</style>
