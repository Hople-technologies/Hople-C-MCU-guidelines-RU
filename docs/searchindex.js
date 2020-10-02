Object.assign(window.search, {"doc_urls":["hople_c_mcu_guidlines.html#Методические-рекомендации-hople-по-программированию-на-С-для-микроконтроллеров","C_style_guidlines.html#Правила-оформления-кода-на-С","lib_types.html#Типы-библиотек","lib_types.html#Что-дает-использование-inti","inimp_list.html#Список-официальный-inimp-библиотек","inimp_list.html#Взаимодействие-с-микросхемами"],"index":{"documentStore":{"docInfo":{"0":{"body":8,"breadcrumbs":1,"title":1},"1":{"body":0,"breadcrumbs":0,"title":0},"2":{"body":58,"breadcrumbs":0,"title":0},"3":{"body":4,"breadcrumbs":1,"title":1},"4":{"body":6,"breadcrumbs":1,"title":1},"5":{"body":2,"breadcrumbs":0,"title":0}},"docs":{"0":{"body":"В Hople мы высокого ценим эффективность и качество во всех нашей аспектах деятельности. Программное обеспечение для микроконтроллеров не является исключением. От качества встраиваемого ПО может зависеть жизнь и безопасность людей, некачественные алгоритмы могут приводить к выходу из строя управляемых систем и уменьшению общего срока службы, а плохая оптимизация и приводит к потреблению большого количества ресурсов, например электроэнергии. Мы считаем, что унификация способов разработки и тестирования - важный этап повышения качества и безопасности программного обеспечения для встраиваемых систем, а также эффективный способ сделать разработку дешевле и эффективнее. Имея в виду данную идею мы оформили и продолжаем обновлять этот набор правил и методов разработки и тестирования программного обеспечения встраиваемых систем. В данной документации описаны : наши методические рекомендации по стилю кода, написанного на языке С; наш взгляд на разделение кода на независимые компоненты (библиотеки) и наш подход к унификации данных компонентов; наш подход к тестированию и отладке встраиваемых систем. /Что-то, что я допишу потом, когда это что-то появится/ Данная информация распространяется в соответствии с лицензией /написать лицензию/ . Эта документация доступна на нескольких языках : English ; Русский . Мы активно приветствуем исправления и улучшения этой документации . Подробнее о внесении вклада можно почитать в файле CONTRIBUTING.md в соответствующем репозитории на gitHub: English source gitHub Русский исходник gitHub","breadcrumbs":"Методические рекомендации Hople по программированию на С для микроконтроллеров","id":"0","title":"Методические рекомендации Hople по программированию на С для микроконтроллеров"},"1":{"body":"","breadcrumbs":"Правила оформления кода на С","id":"1","title":"Правила оформления кода на С"},"2":{"body":"При разработке программного обеспечения для микроконтроллеров мы выделяем 3 типа библиотек по признак зависимости от аппаратного обеспечения (hardware dependency differentiation HDD): взаимодействия с аппаратным обеспечением (hardware interfacing); зависящие от аппаратного обеспечения, но не зависящие от взаимодействия (hardware dependent, interfacing independent); не зависящие от аппаратного обеспечения (hardware independent). Перед тем, как объяснить, зачем необходим каждый тип библиотек, нужно понять ситуации, возникающую при разработке программного обеспечения для микроконтроллеров: внутри современных микроконтроллеров находится большое количество периферии, соответственно каждый вывод может быть отнесен к большому количеству различных периферийных устройств; настройка идентичных периферий может сильно отличаться как между различными производителями, так и между различными семействами микроконтроллеров одного производителя; после добавления микроконтроллера на печатную плату, задачи всех ножек уже известны и не будут изменяться в процессе работы устройства. Программирование микроконтроллеров начинается с настройки и реализации взаимодействия с периферией (например считывание показаний АЦП, передачи данных по интерфейсам связи или генерации ШИМ-сигнала). Код реализующий непосредственную настройку, а также взаимодействие с периферией можно назвать \" программным обеспечением взаимодействия с аппаратным обеспечением \", важной особенностью этого совершенно условного типа ПО является то, что оно будет отличаться как для различных семейств микроконтроллеров установленных в идентичные устройства, так и для одинаковых микроконтроллеров, установленных в различные устройства (так как требуемый от МК функционал может отличаться). На следующем \"уровне\" программного обеспечения реализуется логика обработки данных, полученных от периферии (например различные преобразования: показаний АЦП в определенный физический параметр или данных полученных от IMU в углы или скорости изменения углов). Данный тип программного обеспечения мы будем называть \" зависящим от аппаратного обеспечения, но не зависящими от взаимодействия с аппаратным обеспечением. Важной особенность данного типа ПО является независимость от конкретных методов взаимодействия с периферией микроконтроллера, но прим этом зависимость от конкретного типа периферии. Для объяснения этого утверждения объясним пример про обработку показаний АЦП: для вычисления значения физического параметр не важно, каким именно образом было получено значение от конкретного АЦП, с другой стороны значение имеет конкретный вид схемы измерения, разрядность АЦП и период опроса. Все важные параметры в этом примере известны заранее и не изменяются в ходе работы устройства. Большое количество программного обеспечения вообще не использует какую-либо периферию цифровых устройств на которых запускается. Пара примеров: алгоритмы вычисления положения объекта в пространстве по углам, полученным от различных датчиков (гироскоп, акселерометр, компас) - данные от датчиков получаются уже в физических величинах, и соответственно никакого взаимодействия с железом не происходит, такой алгоритм может использоваться как в системах управления беспилотными летательными аппаратами, так и для моделирования таких систем без каких либо изменений. К другим примером можно отнести алгоритмы кодирования и декодирования, работу с двухмерной графикой для последующего отображения на дисплеях и многое другое. Программное обеспечение данного типа мы будем называть \"не зависящим от аппаратного обеспечения\". Описанные выше типы являются условными и не имеют строгих границ, однако практически любое программное обеспечение для микроконтроллеров можно разделить между этими тремя типами. Для каждого описанного типа ПО возможно реализация независимых библиотек. Мы будем называть эти библиотеки в соответствии с типами ПО, которые данные библиотеки реализуют реализуют: библиотеки независящими от аппаратного обеспечения (hardware independent libraries) , библиотеки зависящие от аппаратного обеспечения, но не зависящие от взаимодействия (hardware dependent, interfacing independent) - далее hwdii-библиотеки , библиотеки взаимодействия с аппаратным обеспечением (hardware interfacing), далее hwi-библиотеки . Для упрощения классификации введем три правила: если в библиотеке есть хотя бы одна функция, реализующая настройку или взаимодействие с каким-либо видом микроконтроллеров, данная библиотека называться hwi вне зависимости от объема и остального содержания; если в библиотеке есть хотя бы одна функция, реализующая обработку данных от конкретной периферии, но нет функций настройки и взаимодействия с периферией, данная библиотека относится к типу hwdii; если в библиотеке нет никаких зависимостей от периферии (будь то настройка, взаимодействие или обработка), библиотека будет независящей от аппаратного обеспечения. Мы не беремся каким-либо образом классифицировать и стандартизировать эти библиотеки К независящим от аппаратного обеспечения относятся все библиотеки общего назначения. . Чистые библиотеки по определению являются унифицированными и могут быть использованы на любых видах микроконтроллеров любых производителей, и вообще при разработке любого вида программного обеспечения. Разделение библиотек на implementation и implementation independent, позволяет разрабатывать унифицированное программное обеспечение с возможностью запуска на любых устройствах, имеющих в наличии необходимую для запуска кода периферию. Для обеспечения унификации implementation independent-библиотеки (далее inimp-библиотеки) должны выдвигать требования к implementation-библиотекам (далее imp-библиотеки) по реализации конкретного интерфейса обмена данными: то есть набора функций, возвращающих конкретные значения от конкретной периферии. В свою очередь imp-библиотеки должны предоставлять необходимые функции взаимодействия с периферией конкретного микроконтроллера. Например inimp-библиотека взаимодействия с микросхемой гироскопа/акселерометра должна требовать от Implementation библиотеки конкретной настройки параметров интерфейса SPI (частоты передачи, данных, вида сообщения и так далее), а также предоставления функции, которая бы позволяла отправлять байт по интерфейсу SPI и возвращала бы байт, полученный этим интерфейсом. При этом Implementation библиотеки совершенно не важно, к акому именно SPI на микроконтроллере будет подключена микросхема. Со своей стороны imp-библиотека должна настроить SPI к которому подключена микросхема передачи данных на требуемые параметры и предоставить функцию соответствующую требованиям inimp-библиотеки для данного конкретного SPI, после чего inimp-библиотека может воспользоваться указателем на данную функцию для реализации логики обмена данными. Это очень простой пример того, как можно разделить зоны ответственности между различными библиотеками, написанная один раз inimp-библиотека может свободно переноситься между любыми устройствами при условии, что для них будет написана imp-библиотека. Под imp-библиотекой мы подразумеваем чуть больше чем реализацию конкретных функций для конкретного микроконтроллера, подробнее об этом можно почитать в подглаве, описывающей нашу архитектуру imp-библиотек. Для При этом imp-библиотека это в целом очень опциональная вещь, которая в современной ситуации может быть реализована производителем микроконтроллеров в том или ином виде. Например STMicroelectronics предоставляет приложение CubeMX, с помощью которого можно интерактивно настроить ножки и параметры периферии, а также библиотеку HAL, которая реализует большое количество функций взаимодействия с периферией (например ту же функцию передачи одного байта по заданному SPI с возвращением полученного байта), что может значительно ускорить разработку при условии наличия готовой inimp-библиотеки. Это было очень высокоуровневое описание нашей идеи разделения программного обеспечения для микроконтроллеров на типы. Подробнее о том, в каком именно виде мы представляем каждый тип библиотек написано в соответствующих подглавах. Нашей основной целью является продвижение идеи inimp-библиотек и станадртизация их оформления для обеспечения более унифицированного взаимодействия между различными устройствами., как так как библиотеки, реализующие работу с периферией часто предоставляются компаниями-производителями микросхем, а чистые библиотеки не имеют никаких принципиальных проблемы для чего мы предлагаем правила оформления кода, выдвижения и описания требований,","breadcrumbs":"Типы библиотек","id":"2","title":"Типы библиотек"},"3":{"body":"(В это описание надо со временем привести побольше примеров с кодом и пару картинок, разъясняющих ситуацию) Сейчас еще задумался о том, что impi-библиотеки это именно библиотеки взаимодействия с какого-то рода конкретными устройствами (микросхемами или каскадами) и возможно есть смысл ввести еще четвертый тип библиотек, схожих по наполнению с impi, но необходимых для реализации логики работы какого-то конкретного устройства - что-то, что я когда-то называл device-библиотеками, но это надо смотреть на практике Важно еще написать что вообще подразумевается под библиотекой (мол это не один .h-файл, а их набор, главный из которых имеет в названии нужный постфикс)","breadcrumbs":"Что дает использование inti","id":"3","title":"Что дает использование inti"},"4":{"body":"В данном списке находятся только open-source inimp-библиотеки, полностью соответствующие правилам Hople. Формат записи библиотек: /Название библиотеки/ - /полная ссылка на репозиорй/ - /Разработчик/ - /Дата последней проверки соответствия библиотеки правилам Hople (не указывается для библиотек разработанных в Hople)/ /Краткое описание/","breadcrumbs":"Список официальный inimp-библиотек","id":"4","title":"Список официальный inimp-библиотек"},"5":{"body":"NRF_24l01p_inimp - - Hople -","breadcrumbs":"Взаимодействие с микросхемами","id":"5","title":"Взаимодействие с микросхемами"}},"length":6,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"3":{"df":1,"docs":{"2":{"tf":1.0}}},"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{".":{"df":0,"docs":{},"m":{"d":{"df":1,"docs":{"0":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}}}}},"u":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"x":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}},"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.7320508075688772}}},"df":0,"docs":{}}}},"v":{"df":0,"docs":{},"i":{"c":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}}},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"df":0,"docs":{},"s":{"df":0,"docs":{},"h":{"df":1,"docs":{"0":{"tf":1.4142135623730951}}}}}}}}},"g":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":0,"docs":{},"u":{"b":{"df":1,"docs":{"0":{"tf":1.7320508075688772}}},"df":0,"docs":{}}}}}},"h":{"a":{"df":0,"docs":{},"l":{"df":1,"docs":{"2":{"tf":1.0}}},"r":{"d":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":2.6457513110645907}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"d":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"3":{"tf":1.0}},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":3,"docs":{"0":{"tf":1.4142135623730951},"4":{"tf":1.7320508075688772},"5":{"tf":1.0}}}}},"w":{"d":{"df":0,"docs":{},"i":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":1,"docs":{"2":{"tf":2.6457513110645907}},"i":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":2.449489742783178}}}}}}}}},"u":{"df":1,"docs":{"2":{"tf":1.0}}}},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":2.449489742783178}}},"df":0,"docs":{}}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":2,"docs":{"2":{"tf":2.6457513110645907},"4":{"tf":1.4142135623730951}}}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"f":{"a":{"c":{"df":1,"docs":{"2":{"tf":2.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"i":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"l":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"n":{"df":0,"docs":{},"r":{"df":0,"docs":{},"f":{"_":{"2":{"4":{"df":0,"docs":{},"l":{"0":{"1":{"df":0,"docs":{},"p":{"_":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":1,"docs":{"5":{"tf":1.0}}}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"c":{"df":2,"docs":{"0":{"tf":1.0},"4":{"tf":1.0}}},"df":0,"docs":{}}}},"p":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":2.449489742783178}}}},"t":{"df":0,"docs":{},"m":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}}}}}},"breadcrumbs":{"root":{"3":{"df":1,"docs":{"2":{"tf":1.0}}},"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{".":{"df":0,"docs":{},"m":{"d":{"df":1,"docs":{"0":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}}}}},"u":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"x":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}},"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.7320508075688772}}},"df":0,"docs":{}}}},"v":{"df":0,"docs":{},"i":{"c":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}}},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"df":0,"docs":{},"s":{"df":0,"docs":{},"h":{"df":1,"docs":{"0":{"tf":1.4142135623730951}}}}}}}}},"g":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":0,"docs":{},"u":{"b":{"df":1,"docs":{"0":{"tf":1.7320508075688772}}},"df":0,"docs":{}}}}}},"h":{"a":{"df":0,"docs":{},"l":{"df":1,"docs":{"2":{"tf":1.0}}},"r":{"d":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"2":{"tf":2.6457513110645907}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"d":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"3":{"tf":1.0}},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":3,"docs":{"0":{"tf":1.7320508075688772},"4":{"tf":1.7320508075688772},"5":{"tf":1.0}}}}},"w":{"d":{"df":0,"docs":{},"i":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":1,"docs":{"2":{"tf":2.6457513110645907}},"i":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":2.449489742783178}}}}}}}}},"u":{"df":1,"docs":{"2":{"tf":1.0}}}},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":2.449489742783178}}},"df":0,"docs":{}}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":2,"docs":{"2":{"tf":2.6457513110645907},"4":{"tf":1.7320508075688772}}}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"f":{"a":{"c":{"df":1,"docs":{"2":{"tf":2.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"i":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}}},"l":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"n":{"df":0,"docs":{},"r":{"df":0,"docs":{},"f":{"_":{"2":{"4":{"df":0,"docs":{},"l":{"0":{"1":{"df":0,"docs":{},"p":{"_":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":1,"docs":{"5":{"tf":1.0}}}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"c":{"df":2,"docs":{"0":{"tf":1.0},"4":{"tf":1.0}}},"df":0,"docs":{}}}},"p":{"df":0,"docs":{},"i":{"df":1,"docs":{"2":{"tf":2.449489742783178}}}},"t":{"df":0,"docs":{},"m":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}}}}}},"title":{"root":{"df":0,"docs":{},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"0":{"tf":1.0}}}}}},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":1,"docs":{"4":{"tf":1.0}}}}},"t":{"df":0,"docs":{},"i":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}}},"lang":"English","pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":30,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});