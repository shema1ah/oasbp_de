<template>
  <div class="new-mchnt">
    <header class="page-header style2">
      <h2
        class="page-title"
      >{{this.isUpdate ? $t('merchant.newMerchant.title2') : $t('merchant.newMerchant.title1')}}</h2>
      <el-button type="text" @click="cancelHandler">
        <i class="el-icon-close"></i>
        <span>{{$t('common.close')}}</span>
      </el-button>
    </header>

    <div class="top-tabs">
      <span
        class="change-btn"
        :class="{ isChoose: isBusiness, hoverState: !isUpdate}"
        :tag.prop="isBusiness"
        @click="changeBoard"
      >Business Onboarding</span>
      <hr />
      <span
        class="change-btn"
        :class="{ isChoose: !isBusiness, hoverState: !isUpdate}"
        :tag.prop="!isBusiness"
        @click="changeBoard"
      >Person Onboarding</span>
    </div>

    <el-form
      v-loading="isLoading"
      ref="baseinfo"
      :model="formData"
      :rules="baseRules"
      label-width="10px"
    >
      <h3>{{isBusiness? $t('merchant.newMerchant.basic.cap1') : $t('merchant.newMerchant.basic.cap7')}}</h3>

      <el-form-item :label="$t('merchant.newMerchant.form.channel')" prop="first_agent_uid">
        <el-select v-model="formData.first_agent_uid" @change="selectChannelHandler">
          <el-option
            :label="item.name"
            :value="item.qd_uid"
            v-for="item in channels1"
            :key="item.qd_uid"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item :label="$t('merchant.newMerchant.form.channel2')" prop="second_agent_uid">
        <el-select
          v-model="formData.second_agent_uid"
          :placeholder="$t('merchant.form.ph')"
          @change="selectChannel2Handler"
        >
          <el-option
            :label="item.name"
            :value="item.qd_uid"
            v-for="item in channels2"
            :key="item.qd_uid"
          ></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item :label="$t('merchant.newMerchant.form.saleMan')" prop="sls_uid">
        <el-select v-model="formData.sls_uid">
          <el-option
            :label="item.name"
            :value="item.userid"
            v-for="item in salesperson"
            :key="item.userid"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item :label="$t('merchant.newMerchant.form.contact')" prop="slsm_name" v-if="isUpdate">
         <el-input id="op_type" v-model="formData.slsm_name"
                :placeholder="$t('merchant.newMerchant.rule43')"
                readonly
                class="sub-account-item-info"><template slot="append"><i class="el-icon-arrow-down tree-indic" @click.stop="showTreeComponent"></i></template>
          </el-input>
          <el-tree id="op-type-tree" :data="salesperson" :props="defaultProps" @node-click="handleNodeClick"
                v-show="isShowTree"
                node-key="uid"
                ref="tree"
                style="position:absolute;top:38px;z-index:9;width:299px;overflow-y:auto;height:320px;"></el-tree>
      </el-form-item>-->

      <!-- <el-form-item
        :label="$t('merchant.newMerchant.form.bigMerchant')"
        prop="mode"
        v-if="isBusiness"
      >
        <el-select v-model="formData.mode" ref="mode">
          <el-option :label="$t('merchant.newMerchant.form.sub')" value="mchnt"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.big')" value="bigmchnt"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item prop="name" :label="$t('merchant.newMerchant.form.meiname')" v-if="isBusiness">
        <el-input v-model.trim="formData.name"></el-input>
      </el-form-item>

      <el-form-item prop="country" :label="$t('merchant.newMerchant.form.country')">
        <el-select @change="resetType" v-model="formData.country">
          <el-option :label="$t('shop.newStore.Ger')" value="DE"></el-option>
          <el-option :label="$t('shop.newStore.CZ')" value="CZ"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="mchnt_type" :label="$t('merchant.newMerchant.form.mertype')">
        <el-select v-model="formData.mchnt_type" :placeholder="$t('merchant.form.ph_legal')">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in isBusiness ? selectList.busi_mchnt_type[formData.country] : selectList.person_mchnt_type[formData.country]"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="first_name"
        :label="$t('merchant.newMerchant.form.first_name')"
        v-if="!isBusiness"
        :error="peopleExist1 ? $t('merchant.newMerchant.rule46') : ''"
      >
        <el-input v-model.trim="formData.first_name" @blur="checkPeople(formData,2)"></el-input>
      </el-form-item>

      <el-form-item
        prop="last_name"
        :label="$t('merchant.newMerchant.form.last_name')"
        v-if="!isBusiness"
        :error="peopleExist1 ? $t('merchant.newMerchant.rule46') : ''"
      >
        <el-input v-model.trim="formData.last_name" @blur="checkPeople(formData,2)"></el-input>
      </el-form-item>

      <el-form-item
        prop="birthday"
        :label="$t('merchant.newMerchant.form.date_of_birth')"
        v-if="!isBusiness"
        :error="peopleExist1 ? $t('merchant.newMerchant.rule46') : ''"
      >
        <el-date-picker
          v-model.trim="formData.birthday"
          type="date"
          format="dd-MM-yyyy"
          value-format="yyyy-MM-dd HH:mm:ss"
          :placeholder="$t('common.chooseDate')"
          @blur="checkPeople(formData,2)"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        prop="salutation"
        :label="$t('merchant.newMerchant.form.salutation')"
        v-if="!isBusiness"
        :rules="listRules.salutation"
      >
        <el-select v-model="formData.salutation">
          <el-option :label="item" :value="item" v-for="item in selectList.salutation" :key="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="title" :label="$t('merchant.newMerchant.form.title')" v-if="!isBusiness">
        <el-select v-model="formData.title">
          <el-option :label="item" :value="item" v-for="item in selectList.title" :key="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="nation"
        :label="$t('merchant.newMerchant.form.nationality')"
        v-if="!isBusiness"
      >
        <el-select v-model="formData.nation">
          <el-option
            :label="value"
            :value="findKey(selectList.country,value)"
            v-for="value in countryList"
            :key="value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="foundation_date"
        :label="$t('merchant.newMerchant.form.foundation_date')"
        v-if="isBusiness"
      >
        <el-date-picker
          v-model.trim="formData.foundation_date"
          type="date"
          format="dd-MM-yyyy"
          value-format="yyyy-MM-dd HH:mm:ss"
          :placeholder="$t('common.chooseDate')"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        prop="business_purpose"
        :label="$t('merchant.newMerchant.form.business_purpose')"
      >
        <el-input
          :placeholder="$t('merchant.newMerchant.rule49')"
          v-model.trim="formData.business_purpose"
        ></el-input>
      </el-form-item>

      <el-form-item prop="address" :label="$t('merchant.newMerchant.form.addressT')">
        <el-input v-model.trim="formData.address"></el-input>
      </el-form-item>

      <el-form-item prop="post" :label="$t('merchant.newMerchant.form.postal_code')">
        <el-input v-model.trim="formData.post"></el-input>
      </el-form-item>

      <el-form-item prop="city" :label="$t('merchant.newMerchant.form.city')">
        <el-input v-model.trim="formData.city"></el-input>
      </el-form-item>

      <!-- <el-form-item
        prop="empeoy_status"
        :label="$t('merchant.newMerchant.form.empeoyment_sataus')"
        v-if="!isBusiness"
      >
        <el-select v-model="formData.empeoy_status">
          <el-option
            :label="item"
            :value="item"
            v-for="item in selectList.people_empeoy_status"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item prop="email" :rules="isBusiness ? baseRules.business_email : baseRules.email" :label="isBusiness ? $t('merchant.newMerchant.form.business_email') : $t('merchant.newMerchant.form.postT')">
        <el-input v-model.trim="formData.email"></el-input>
      </el-form-item>

      <el-form-item
        prop="person_mobile"
        :label="$t('merchant.newMerchant.form.concatNumber')"
        v-if="!isBusiness"
      >
        <el-input v-model.trim="formData.person_mobile"></el-input>
      </el-form-item>

      <!-- <el-form-item prop="sector" :label="$t('merchant.newMerchant.form.sector')" v-if="isBusiness">
        <el-select v-model="formData.sector">
          <el-option :label="item" :value="item" v-for="item in selectList.sector" :key="item"></el-option>
        </el-select>
      </el-form-item>-->
      <!-- 
      <el-form-item prop="industry" :label="$t('merchant.newMerchant.form.industry')" v-if="isBusiness">
        <el-select v-model="formData.industry">
         <el-option :label="item" :value="item" v-for="item in selectList.industry" :key="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="industry_key" :label="$t('merchant.newMerchant.form.industry_key')" v-if="isBusiness">
        <el-select v-model="formData.industry_key">
         <el-option :label="item" :value="item" v-for="item in selectList.industry_key" :key="item"></el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item
        prop="licensenumber"
        :label="$t('merchant.newMerchant.form.reg_number')"
        v-if="isBusiness"
      >
        <el-input v-model.trim="formData.licensenumber"></el-input>
      </el-form-item>

      <el-form-item
        prop="license_name"
        :label="$t('merchant.newMerchant.form.reg_issuer')"
        v-if="isBusiness"
      >
        <el-input v-model.trim="formData.license_name"></el-input>
      </el-form-item>

      <el-form-item
        prop="website"
        :label="$t('merchant.newMerchant.form.website')"
      >
        <el-input v-model.trim="formData.website"></el-input>
      </el-form-item>


      <el-form-item
        prop="id_type"
        :label="$t('merchant.newMerchant.form.id_type')"
        v-if="!isBusiness"
        :rules="listRules.id_type"
      >
        <el-select v-model="formData.id_type">
          <el-option :label="$t('merchant.newMerchant.form.id_card')" value="idnumber"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.pass_card')" value="passport"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="idnumber"
        :label="$t('merchant.newMerchant.form.idnumber')"
        v-if="!isBusiness"
        :rules="listRules.idnumber"
      >
        <el-input v-model.trim="formData.idnumber"></el-input>
      </el-form-item>

      <!-- <el-form-item
            :prop="'owners.'+ i + '.id_type'"
            :label="$t('merchant.newMerchant.form.id_type')"
            :rules="listRules.id_type"
          >
            <el-select v-model="n.id_type" :disabled="peopleExist2[i]">
              <el-option :label="$t('merchant.newMerchant.form.id_card')" value="national"></el-option>
              <el-option :label="$t('merchant.newMerchant.form.pass_card')" value="passport"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.idnumber'"
            :label="$t('merchant.newMerchant.form.idnumber')"
            :rules="listRules.idnumber"
          >
            <el-input v-model.trim="n.idnumber" :disabled="peopleExist2[i]"></el-input>
      </el-form-item>-->

      <!-- 股东信息 -->
      <transition-group name="fade" tag="div" v-if="isBusiness">
        <div v-for="(n, i) in formData.owners" :key="i">
          <div class="title-gap">
            <h3 v-if="i === 0">{{$t('merchant.newMerchant.basic.cap2')}}</h3>
            <el-button
              v-if="i === 0"
              class="puls"
              type="text"
              tag="plus"
              icon="el-icon-plus"
              @click.prevent="changeShow"
            ></el-button>
            <el-button
              v-else-if="i === formData.owners.length-1"
              class="puls"
              type="text"
              icon="el-icon-minus"
              @click.prevent="changeShow"
            ></el-button>
          </div>

          <el-form-item
            :prop="'owners.'+ i + '.first_name'"
            :label="$t('merchant.newMerchant.form.first_name')"
            :rules="listRules.first_name"
          >
            <el-input v-model.trim="n.first_name" @blur="checkPeople(n,3,i)"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.last_name'"
            :label="$t('merchant.newMerchant.form.last_name')"
            :rules="listRules.last_name"
          >
            <el-input v-model.trim="n.last_name" @blur="checkPeople(n,3,i)"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.birthday'"
            :label="$t('merchant.newMerchant.form.date_of_birth')"
            :rules="listRules.date_of_birth"
          >
            <el-date-picker
              v-model.trim="n.birthday"
              type="date"
              format="dd-MM-yyyy"
              value-format="yyyy-MM-dd HH:mm:ss"
              :placeholder="$t('common.chooseDate')"
              @blur="checkPeople(n,3,i)"
            ></el-date-picker>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.salutation'"
            :label="$t('merchant.newMerchant.form.salutation')"
            :rules="listRules.salutation"
          >
            <el-select v-model="n.salutation" :disabled="peopleExist2[i]">
              <el-option
                :label="item"
                :value="item"
                v-for="item in selectList.salutation"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.title'"
            :label="$t('merchant.newMerchant.form.title')"
          >
            <el-select v-model="n.title" :disabled="peopleExist2[i]">
              <el-option :label="item" :value="item" v-for="item in selectList.title" :key="item"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.nation'"
            :label="$t('merchant.newMerchant.form.nationality')"
            :rules="listRules.nation"
          >
            <el-select v-model="n.nation" :disabled="peopleExist2[i]">
              <el-option
                :label="value"
                :value="findKey(selectList.country,value)"
                v-for="value in countryList"
                :key="value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.address'"
            :label="$t('merchant.newMerchant.form.addressT')"
            :rules="listRules.address"
          >
            <el-input v-model.trim="n.address" :disabled="peopleExist2[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.post'"
            :label="$t('merchant.newMerchant.form.postal_code')"
            :rules="listRules.post"
          >
            <el-input v-model.trim="n.post" :disabled="peopleExist2[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.city'"
            :label="$t('merchant.newMerchant.form.city')"
            :rules="listRules.city"
          >
            <el-input v-model.trim="n.city" :disabled="peopleExist2[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.country'"
            :label="$t('merchant.newMerchant.form.country')"
            :rules="listRules.country"
          >
            <el-select v-model="n.country" :disabled="peopleExist2[i]">
              <el-option
                :label="value"
                :value="findKey(selectList.country,value)"
                v-for="value in countryList"
                :key="value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.empeoy_status'"
            :label="$t('merchant.newMerchant.form.empeoyment_sataus')"
            :rules="listRules.empeoyment_sataus"
          >
            <el-select v-model="n.empeoy_status" :disabled="peopleExist2[i]">
              <el-option
                :label="item"
                :value="item"
                v-for="item in selectList.people_empeoy_status"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.vofing'"
            :label="$t('merchant.newMerchant.form.vofing_share')"
            :rules="listRules.vofing_share"
          >
            <el-input v-model.number.trim="n.vofing" :placeholder="$t('settleMent.msg.t5')"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.email'"
            :label="$t('merchant.newMerchant.form.postT')"
            :rules="listRules.email"
          >
            <el-input v-model.trim="n.email" :disabled="peopleExist2[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.mobile'"
            :label="$t('merchant.newMerchant.form.concatNumber')"
            :rules="listRules.mobile"
          >
            <el-input v-model.trim="n.mobile" :disabled="peopleExist2[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.id_type'"
            :label="$t('merchant.newMerchant.form.id_type')"
            :rules="listRules.id_type"
          >
            <el-select v-model="n.id_type" :disabled="peopleExist2[i]">
              <el-option :label="$t('merchant.newMerchant.form.id_card')" value="national"></el-option>
              <el-option :label="$t('merchant.newMerchant.form.pass_card')" value="passport"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.idnumber'"
            :label="$t('merchant.newMerchant.form.idnumber')"
            :rules="listRules.idnumber"
          >
            <el-input v-model.trim="n.idnumber" :disabled="peopleExist2[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.is_legal'"
            :label="$t('merchant.newMerchant.form.legal_rep')"
            :rules="listRules.legal_rep"
          >
            <el-select v-model="n.is_legal">
              <el-option :label="$t('merchant.detail.signed.no')" value="0"></el-option>
              <el-option :label="$t('merchant.detail.signed.yes')" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'owners.'+ i + '.represe'"
            :label="$t('merchant.newMerchant.form.represeutation')"
            :rules="listRules.represeutation"
            v-if="n.is_legal == 1"
          >
            <el-select v-model="n.represe" disabled>
              <el-option :label="item" :value="item" v-for="item in selectList.represe" :key="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </transition-group>

      <!-- 法定代表人 -->
      <transition-group name="fade" tag="div" v-if="isBusiness">
        <div v-for="(n, i) in formData.legals" :key="i">
          <div class="title-gap">
            <h3 v-if="i === 0">{{$t('merchant.newMerchant.basic.cap3')}}</h3>
            <el-button
              v-if="i === 0"
              class="puls"
              type="text"
              tag="plus"
              icon="el-icon-plus"
              @click="changeShow2"
            ></el-button>
            <el-button
              v-else-if="i === formData.legals.length-1"
              class="puls"
              type="text"
              icon="el-icon-minus"
              @click="changeShow2"
            ></el-button>
          </div>

          <el-form-item
            :prop="'legals.'+ i + '.first_name'"
            :label="$t('merchant.newMerchant.form.first_name')"
            :rules="hasLegal&&!hasInput ? [] : listRules.first_name"
          >
            <el-input v-model.trim="n.first_name" @blur="checkPeople(n,4,i)"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.last_name'"
            :label="$t('merchant.newMerchant.form.last_name')"
            :rules="hasLegal&&!hasInput ? [] : listRules.last_name"
          >
            <el-input v-model.trim="n.last_name" @blur="checkPeople(n,4,i)"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.birthday'"
            :label="$t('merchant.newMerchant.form.date_of_birth')"
            :rules="hasLegal&&!hasInput ? [] : listRules.date_of_birth"
          >
            <el-date-picker
              v-model.trim="n.birthday"
              type="date"
              format="dd-MM-yyyy"
              value-format="yyyy-MM-dd HH:mm:ss"
              :placeholder="$t('common.chooseDate')"
              @blur="checkPeople(n,4,i)"
            ></el-date-picker>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.salutation'"
            :label="$t('merchant.newMerchant.form.salutation')"
            :rules="hasLegal&&!hasInput ? [] : listRules.salutation"
          >
            <el-select v-model="n.salutation" :disabled="peopleExist3[i]">
              <el-option
                :label="item"
                :value="item"
                v-for="item in selectList.salutation"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.title'"
            :label="$t('merchant.newMerchant.form.title')"
          >
            <el-select v-model="n.title" :disabled="peopleExist3[i]">
              <el-option :label="item" :value="item" v-for="item in selectList.title" :key="item"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.nation'"
            :label="$t('merchant.newMerchant.form.nationality')"
            :rules="hasLegal&&!hasInput ? [] : listRules.nation"
          >
            <el-select v-model="n.nation" :disabled="peopleExist3[i]">
              <el-option
                :label="value"
                :value="findKey(selectList.country,value)"
                v-for="value in countryList"
                :key="value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.address'"
            :label="$t('merchant.newMerchant.form.addressT')"
            :rules="hasLegal&&!hasInput ? [] : listRules.address"
          >
            <el-input v-model.trim="n.address" :disabled="peopleExist3[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.post'"
            :label="$t('merchant.newMerchant.form.postal_code')"
            :rules="hasLegal&&!hasInput ? [] : listRules.post"
          >
            <el-input v-model.trim="n.post" :disabled="peopleExist3[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.city'"
            :label="$t('merchant.newMerchant.form.city')"
            :rules="hasLegal&&!hasInput ? [] : listRules.city"
          >
            <el-input v-model.trim="n.city" :disabled="peopleExist3[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.country'"
            :label="$t('merchant.newMerchant.form.country')"
            :rules="hasLegal&&!hasInput ? [] : listRules.country"
          >
            <el-select v-model="n.country" :disabled="peopleExist3[i]">
              <el-option
                :label="value"
                :value="findKey(selectList.country,value)"
                v-for="value in countryList"
                :key="value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.empeoy_status'"
            :label="$t('merchant.newMerchant.form.empeoyment_sataus')"
            :rules="hasLegal&&!hasInput ? [] : listRules.empeoyment_sataus"
          >
            <el-select v-model="n.empeoy_status" :disabled="peopleExist3[i]">
              <el-option
                :label="item"
                :value="item"
                v-for="item in selectList.people_empeoy_status"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.represe'"
            :label="$t('merchant.newMerchant.form.represeutation')"
            :rules="hasLegal&&!hasInput ? [] : listRules.represeutation"
          >
            <el-select v-model="n.represe" disabled>
              <el-option :label="item" :value="item" v-for="item in selectList.represe" :key="item"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.email'"
            :label="$t('merchant.newMerchant.form.postT')"
            :rules="hasLegal&&!hasInput ? [] : listRules.email"
          >
            <el-input v-model.trim="n.email" :disabled="peopleExist3[i]"></el-input>
          </el-form-item>

          <el-form-item
            :prop="'legals.'+ i + '.mobile'"
            :label="$t('merchant.newMerchant.form.concatNumber')"
            :rules="listRules.mobile"
          >
            <el-input v-model.trim="n.mobile" :disabled="peopleExist3[i]"></el-input>
          </el-form-item>
        </div>
      </transition-group>

      <!-- 支付通道 -->
      <div v-if="!isUpdate">
        <h3>{{$t('merchant.newMerchant.basic.cap4')}}</h3>

        <el-form-item prop="pid_select" v-if="!isUpdate">
          <el-select
            v-model="formData.pid_select"
            :placeholder="$t('merchant.newMerchant.requiredRule.rule25')"
          >
            <el-option
              v-for="item in list"
              :key="item.pid_name"
              :label="item.pid_name"
              :value="item.pid_name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            v-if="!isUpdate"
            class="el-button el-button--primary"
            @click="addList()"
          >{{$t('common.confirm')}}</el-button>
        </el-form-item>

        <div class="payList" v-for="(item, index) in mchnt_ratios" :key="index">
          <el-form-item>
          <label class="width-limit">{{item.pid_name}}</label>
            <el-input-number
              v-model="item.ratio"
              :precision="2"
              :step="0.01"
              :min="Number(item.ratioMin)"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            v-if="item.line_type !== ''"
          >
           <label>{{$t('merchant.newMerchant.form.accessType')}}</label>
            <el-select :disabled="true" v-model="item.line_type">
              <el-option :label="$t('merchant.newMerchant.accessTypes.offline')" value="offline"></el-option>
              <el-option :label="$t('merchant.newMerchant.accessTypes.online')" value="online"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="item.finance_type !== ''"    
          >
          <label>{{$t('merchant.newMerchant.form.applicationType')}}</label>
            <el-select :disabled="true" v-model="item.finance_type">
              <el-option :label="$t('merchant.newMerchant.applicationTypes.direct')" value="direct"></el-option>
              <el-option
                :label="$t('merchant.newMerchant.applicationTypes.indirect')"
                value="indirect"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="!isUpdate" class="icon_remove">
            <i class="el-icon-remove" @click="pid_name_remove(item.pid_name)"></i>
          </div>
        </div>

        <!-- 门店信息 -->
        <h3>{{$t('merchant.newMerchant.basic.cap5')}}</h3>

        <el-form-item prop="store_shopname" :label="$t('merchant.newMerchant.form.storename')">
          <el-input v-model.trim="formData.store_shopname"></el-input>
        </el-form-item>

        <el-form-item prop="mcc" :label="$t('merchant.newMerchant.form.QFMCC')">
          <el-input
            id="op_type"
            v-model="formData.mcc"
            :placeholder="$t('merchant.newMerchant.requiredRule.rule9')"
            readonly
            class="sub-account-item-info"
          >
            <template slot="append">
              <i class="el-icon-arrow-down tree-indic" @click.stop="showIndustyTreeComponent"></i>
            </template>
          </el-input>
          <el-tree
            :data="shopTypes"
            @node-click="IndustyhandleNodeClick"
            v-show="isShowIndustyTree"
            node-key="id"
            :props="select==='en-us'?shopTypeProps_en:shopTypeProps_zh"
            draggable
          ></el-tree>
        </el-form-item>

        <el-form-item
          prop="store_expect_amt"
          :label="$t('merchant.newMerchant.form.expected_volume_transactions')"
        >
          <el-input
            :placeholder="$t('merchant.newMerchant.rule47')"
            v-model.trim="formData.store_expect_amt"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="store_expect_count"
          :label="$t('merchant.newMerchant.form.expected_couut_transactions')"
        >
          <el-input
            :placeholder="$t('merchant.newMerchant.rule48')"
            v-model.trim="formData.store_expect_count"
          ></el-input>
        </el-form-item>

        <el-form-item prop="store_address" :label="$t('merchant.newMerchant.form.addressT')">
          <el-input v-model.trim="formData.store_address"></el-input>
        </el-form-item>

        <el-form-item prop="store_post" :label="$t('merchant.newMerchant.form.postal_code')">
          <el-input v-model.trim="formData.store_post"></el-input>
        </el-form-item>

        <el-form-item prop="store_city" :label="$t('merchant.newMerchant.form.city')">
          <el-input v-model.trim="formData.store_city"></el-input>
        </el-form-item>

        <el-form-item prop="store_country" :label="$t('merchant.newMerchant.form.country')">
          <el-select v-model="formData.store_country">
            <el-option :label="$t('shop.newStore.Ger')" value="DE"></el-option>
            <el-option :label="$t('shop.newStore.CZ')" value="CZ"></el-option>
          </el-select>
        </el-form-item>

        <!-- 结算信息 -->
        <h3>{{$t('merchant.newMerchant.basic.cap6')}}</h3>

        <el-form-item prop="store_iban" :label="$t('merchant.newMerchant.form.accountH')">
          <el-input v-model.trim="formData.store_iban"></el-input>
        </el-form-item>

        <el-form-item prop="store_bic" :label="$t('merchant.newMerchant.form.bic')">
          <el-input v-model.trim="formData.store_bic"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <footer>
      <el-button
        type="primary"
        @click="next"
      >{{isUpdate? $t('common.save') : $t('common.register')}}</el-button>
    </footer>
  </div>
</template>
<script>
/* eslint-disable */
import config from "config";
import axios from "axios";
import qs from "qs";
import _ from "lodash";
import { formatDate } from "../../common/js/util";
import Store from '../../assets/js/store';
const getParams = key => {
  // 获取参数
  let url = window.location.hash.split("?")[1] || "";
  // 正则筛选地址栏
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  // 匹配目标参数
  let result = url.match(reg);
  // 返回参数值
  return result ? decodeURIComponent(result[2]) : "";
};
export default {
  data() {
    const checkName = (rule, value, callback) => {
      axios
        .get(`${config.host}/org/v1/tools/name_exist`, {
          params: {
            mode: 'name',
            check_name: value,
            format: "cors"
          }
        })
        .then(res => {
          if (res.data.respcd !== config.code.OK) {
            callback(new Error(this.$t("merchant.newMerchant.rule45")));
          } else {
            callback();
          }
        })
        .catch(() => {
          this.$message.error(this.$t("common.netError"));
        });
    };
      const checkShopName = (rule, value, callback) => {
      axios
        .get(`${config.host}/org/v1/tools/name_exist`, {
          params: {
            mode: 'shopname',
            check_name: value,
            format: "cors"
          }
        })
        .then(res => {
          if (res.data.respcd !== config.code.OK) {
            callback(new Error(this.$t("merchant.newMerchant.rule45")));
          } else {
            callback();
          }
        })
        .catch(() => {
          this.$message.error(this.$t("common.netError"));
        });
    };
    return {
      select: this.$i18n.locale,
      list: [],
      mchnt_ratios: [],
      isLoading: false,
      isUpdate: false,
      qd_uid: "", // 所有代理商id
      isShowTree: false,
      forFlag: false,
      isBusiness: true,
      peopleExist1: false,
      peopleExist2: [],
      peopleExist3: [],
      ownerItem: "",
      legalItem: "",
      formData: {
        user_type: 3,
        pid_select: "",
        // slsm_name: "", // 业务员姓名
        store_unify_mcc: "",
        first_agent_uid: "", // 一级代理商id
        // second_agent_uid: "", // 二级代理商id
        sls_uid: "", // 业务员id
        // mode: "", // 注册商户的类型
        name: "", // 商户名称
        mchnt_type: "", // 商户类型 1:微小 2：个体商户 3:企业
        first_name: "", //名
        last_name: "", //姓
        birthday: "", //出生日期
        nation: "", //国籍
        foundation_date: "", //成立日期
        business_purpose: "", //商业目的
        address: "", // 公司地址
        post: "", //邮编
        city: "", //城市
        country: "", //国家
        // empeoy_status: "", //职业
        email: "", // 邮箱
        person_mobile: "", // 公司联系人电话
        // sector: "", //一级行业
        // industry: "", //二级行业
        // industry_key: "", //三级行业
        licensenumber: "", //注册号码
        license_name: "", //注册机构名
        store_shopname: "", // 店铺名称
        mcc: "", // 店铺行业
        store_expect_amt: "", //预计交易额
        store_expect_count: "", //预计交易量
        store_address: "", // 门店地址
        store_post: "", //门店邮编
        store_city: "", //门店城市
        store_country: "", //门店国家
        store_iban: "", // 银行账号
        store_bic: "",
        idnumber: "",
        id_type: "",
        salutation: "",
        title: "",
        website: "",
        owners: [
          {
            salutation: "",
            title: "",
            first_name: "",
            last_name: "",
            birthday: "",
            nation: "",
            address: "",
            post: "",
            city: "",
            country: "",
            empeoy_status: "",
            vofing: "",
            email: "",
            mobile: "",
            id_type: "",
            idnumber: "",
            is_legal: "0",
            represe: "ALONE"
          }
        ],
        legals: [
          {
            salutation: "",
            title: "",
            first_name: "",
            last_name: "",
            birthday: "",
            nation: "",
            address: "",
            post: "",
            city: "",
            country: "",
            empeoy_status: "",
            represe: "ALONE",
            email: "",
            mobile: ""
          }
        ]
      },
      shopTypes: [], // 门店行业列表
      selectList: {
        // sector: [],
        // industry: [],
        // industry_key: [],
        represe: [],
        busi_mchnt_type: {},
        person_mchnt_type: [],
        people_empeoy_status: [], //职业类别
        country: {},
        salutation: [],
        title: []
        // mchnt_type: []
      },
      channels1: [],
      // channels2: [],
      salesperson: [],
      defaultProps: {
        children: "slsm",
        label: "name",
        value: "uid"
      },
      shopTypeProps_en: {
        children: "shoptypes",
        label: "name_en",
        value: "id"
      },
      shopTypeProps_zh: {
        children: "shoptypes",
        label: "name",
        value: "id"
      },
      isShowIndustyTree: false,

      baseRules: {
        sls_uid: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule1")
          }
        ],
        // mode: [
        //   {
        //     required: true,
        //     message: this.$t("merchant.newMerchant.requiredRule.rule2")
        //   }
        // ],
        name: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule3")
          },
          { validator: checkName, trigger: "blur" }
        ],
        first_name: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule34")
          }
        ],
        last_name: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule35")
          }
        ],

        birthday: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule36")
          }
        ],
        nation: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule37")
          }
        ],

        foundation_date: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule38")
          }
        ],

        business_purpose: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule39")
          }
        ],

        post: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule40")
          },
          {
              validator: (rule, val, cb) => {
              if (!/^\d+\s*\d+$/.test(val)) {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule1"))
                );
              } else {
                cb();
              }
            }

          },
           {max: 10, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule4'), trigger: 'blur'}
        ],

        store_post: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule40")
          },
           {
              validator: (rule, val, cb) => {
              if (!/^\d+\s*\d+$/.test(val)) {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule1"))
                );
              } else {
                cb();
              }
            }

          },
           {max: 10, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule4'), trigger: 'blur'}
        ],

        city: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule41")
          }
        ],

        store_city: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule41")
          }
        ],

        country: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule42")
          }
        ],

         person_mobile: [
                 {
            validator: (rule, val, cb) => {
              if (!/^\+\d{7,15}$/.test(val) && val != "") {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule3"))
                );
              } else {
                cb();
              }
            }
          }
        ],

        store_country: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule42")
          }
        ],

        // empeoy_status: [
        //   {
        //     required: true,
        //     message: this.$t("merchant.newMerchant.requiredRule.rule43")
        //   }
        // ],

        // sector: [
        //   {
        //     required: true,
        //     message: this.$t("merchant.newMerchant.requiredRule.rule44")
        //   }
        // ],
        // 'industry': [
        //   {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule45')}
        // ],
        // 'industry_key': [
        //   {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule46')}
        // ],

        store_expect_amt: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule49")
          },
          {
            validator: (rule, val, cb) => {
              if (!/^[0-9]*$/.test(val) && val != "") {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule2"))
                );
              } else {
                cb();
              }
            }
          }
        ],
        store_expect_count: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule50")
          },
          {
            validator: (rule, val, cb) => {
              if (!/^[0-9]*$/.test(val) && val != "") {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule2"))
                );
              } else {
                cb();
              }
            }
          }
        ],
        licensenumber: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule52")
          }
        ],
        license_name: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule53")
          }
        ],
        store_shopname: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule20")
          },
          { validator: checkShopName, trigger: "blur" }
        ],
        store_address: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule10")
          }
        ],
        email: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule4")
          },
          {
            validator: (rule, val, cb) => {
              if (
                !/^[\w-]+[\w-.]*@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z\d]{2,6}$/.test(
                  val
                )
              ) {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule1"))
                );
              } else {
                cb();
              }
            }
          }
        ],

             business_email: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule57")
          },
          {
            validator: (rule, val, cb) => {
              if (
                !/^[\w-]+[\w-.]*@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z\d]{2,6}$/.test(
                  val
                )
              ) {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule1"))
                );
              } else {
                cb();
              }
            }
          }
        ],

        mchnt_type: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule26")
          }
        ],

        mcc: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule9")
          }
        ],
        address: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule10")
          }
        ],
        store_iban: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule17")
          },
            {
            validator: (rule, val, cb) => {
              if (!/^[A-Z]{2}\d{2}[A-Z\d]{1,30}$/.test(val)) {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule1"))
                );
              } else {
                cb();
              }
            }
          }

        ],
        store_bic: [
          { required: true, message: this.$t("merchant.newMerchant.rule19") }
        ]
      },
      // 列表规则
      listRules: {
        first_name: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule34")
          }
        ],

        last_name: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule35")
          }
        ],

        date_of_birth: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule36")
          }
        ],

        nation: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule37")
          }
        ],

        address: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule10")
          }
        ],

        post: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule40")
          },
          {
              validator: (rule, val, cb) => {
              if (!/^\d+\s*\d+$/.test(val)) {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule1"))
                );
              } else {
                cb();
              }
            }

          },
           {max: 10, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule4'), trigger: 'blur'}
        ],

        city: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule41")
          }
        ],

        country: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule42")
          }
        ],

           mobile: [
                 {
            validator: (rule, val, cb) => {
              if (!/^\+\d{7,15}$/.test(val) && val != "") {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule3"))
                );
              } else {
                cb();
              }
            }
          }
        ],

        empeoyment_sataus: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule43")
          }
        ],

        vofing_share: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule47")
          },
          {
            validator: (rule, val, cb) => {
              if (val > 100) {
                cb(this.$t("system.tradeLimit.overhundred"));
              } else if (!/^\d+([.]\d{1,2})?$/.test(val)) {
                cb(this.$t("system.tradeLimit.decimal"));
              } else {
                cb();
              }
            }
          }
        ],

        legal_rep: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule48")
          }
        ],

        represeutation: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule51")
          }
        ],

        email: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule4")
          },
          {
            validator: (rule, val, cb) => {
              if (
                !/^[\w-]+[\w-.]*@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z\d]{2,6}$/.test(
                  val
                )
              ) {
                cb(
                  new Error(this.$t("merchant.newMerchant.specialRule.rule1"))
                );
              } else {
                cb();
              }
            }
          }
        ],


        id_type: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule54")
          }
        ],

        idnumber: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule55")
          }
        ],

        salutation: [
          {
            required: true,
            message: this.$t("merchant.newMerchant.requiredRule.rule56")
          }
        ]
      }
    };
  },

  computed: {
    isVofingAllow: function() {
      let vofingSum = 0;
      this.formData.owners.forEach(i => (vofingSum += Number(i.vofing)));
      return vofingSum <= 100 ? true : false;
    },
    countryList: function() {
      return Object.values(this.selectList.country).sort();
    },
    hasLegal: function() {
      return this.formData.owners.some(i => i.is_legal == 1);
    },
    hasInput: function() {
      return this.formData.legals.some(i => {
        let flag = -1;
        for (let value of Object.values(i)) {
          if (value.length > 0) {
            flag++;
          }
        }
        return flag;
      });
    }
  },
  created() {
    if (this.$route.query) {
      this.isUpdate =
        this.$route.query.command === "edit" || getParams("command") === "edit";
      // !this.isUpdate && this.getChannelList();
      !this.isUpdate && this.getPid();
      !this.isUpdate && this.getShopTypes();
      !this.isUpdate && this.getSalesPersonList();
      this.ownerItem = JSON.parse(JSON.stringify(this.formData.owners[0]));
      this.legalItem = JSON.parse(JSON.stringify(this.formData.legals[0]));
      // this.isUpdate && this.getAllSalesperson();
      // this.isUpdate && this.getDetailInfo();
      this.getChannelList();
      this.selectList = Store.get('configList')
    }
  },
  mounted() {
    var _self = this;
    document.addEventListener(
      "click",
      evt => {
        if ("el-tree-node".indexOf(evt.target.className) == -1) {
          if (_self.isShowTree) {
            this.isShowTree = false;
            console.log("点击空白");
            this.isShowIndustyTree = false;
          } else if (_self.isShowIndustyTree) {
            console.log("点击空白");
            this.isShowIndustyTree = false;
          }
        }
        if (
          evt.target.parentNode &&
          evt.target.parentNode.id === "op_type" &&
          evt.target.className.indexOf(
            "el-input__icon el-icon-caret-bottom"
          ) === -1
        ) {
          evt.preventDefault();
          _self.showTreeComponent(evt);
        }
      },
      false
    );
  },
  methods: {
    // 编辑商户的修改业务员部分
    // handleNodeClick(data, node) {
    //   if(data.isLeaf && Object.prototype.toString.call(data.slsm) === "[object Undefined]") {
    //      this.formData.sls_uid = data.uid;
    //      this.formData.slsm_name = data.name;
    //      this.isShowTree = false;
    //   }
    // },
    findKey(obj, value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value));
    },

    showTreeComponent(e) {
      this.isShowTree = true;
    },

    IndustyhandleNodeClick(data, node) {
      if (data.level === 3) {
        this.formData.store_unify_mcc = data.id;
        this.isShowIndustyTree = false;
        this.select === "en-us"
          ? (this.formData.mcc = data.name_en)
          : (this.formData.mcc = data.name);
      }
    },

    showIndustyTreeComponent(e) {
      this.isShowIndustyTree = !this.isShowIndustyTree;
    },

    // getAllSalesperson() {
    //   axios.get(`${config.host}/org/tools/org/slsms`, {
    //     params: {
    //       format: 'cors'
    //     }
    //   })
    //     .then((res) => {
    //       let data = res.data;
    //       if (data.respcd === config.code.OK) {
    //          this.salesperson = data.data;
    //          this.getShopTypes()
    //       } else {
    //         this.$message.error(data.respmsg);
    //       }
    //     }).catch(() => {
    //     this.$message.error(this.$t('common.netError'));
    //   });
    // },
    resetType() {
      this.formData.mchnt_type = "";
    },
    // 获取1级渠道列表
    getChannelList() {
      axios
        .get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: "",
            format: "cors"
          }
        })
        .then(res => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.channels1 = data.data.list;
            // this.isUpdate &&
            //   this.getChannel2List(this.formData.first_agent_uid);
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.$message.error(this.$t("common.netError"));
        });
    },

    // 获取二级渠道列表数据
    // getChannel2List(groupid) {
    //   axios
    //     .get(`${config.host}/org/tools/qudao/list`, {
    //       params: {
    //         groupid: groupid,
    //         format: "cors"
    //       }
    //     })
    //     .then(res => {
    //       let data = res.data;
    //       if (data.respcd === config.code.OK) {
    //         this.channels2 = groupid ? data.data.list : [];
    //         // this.formData.second_agent_uid = "";
    //         this.getSalesPersonList();
    //       } else {
    //         this.$message.error(data.respmsg);
    //       }
    //     })
    //     .catch(() => {
    //       this.$message.error(this.$t("common.netError"));
    //     });
    // },
    // 选择一级代理商
    selectChannelHandler() {
      // this.getChannel2List(groupid);
      // this.formData.second_agent_uid = "";
      this.getSalesPersonList();
      this.formData.sls_uid = "";
    },

    // 选择二级代理商
    // selectChannel2Handler() {
    //   this.getSalesPersonList();
    //   this.formData.sls_uid = "";
    // },

    getSalesPersonList() {
      axios
        .get(`${config.host}/org/tools/slsm`, {
          params: {
            agent_uid: this.formData.first_agent_uid,
              // this.formData.second_agent_uid || this.formData.first_agent_uid,
            format: "cors"
          }
        })
        .then(res => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.salesperson = data.data;
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.$message.error(this.$t("common.netError"));
        });
    },

    getShopTypes() {
      axios
        .get(`${config.host}/org/tools/get_shop_types`, {
          params: {
            format: "cors"
          }
        })
        .then(res => {
          let data = res.data;
          this.isLoading = false;
          if (data.respcd === config.code.OK) {
            this.shopTypes = data.data.shop_types;
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t("common.netError"));
        });
    },
    // getDetailInfo() {
    //   axios
    //     .get(`${config.host}/org/v1/mchnt/info`, {
    //       params: {
    //         userid: this.$route.query.userid || getParams("userid"),
    //         // type: 'bigmerchant',
    //         format: "cors"
    //       }
    //     })
    //     .then(res => {
    //       let data = res.data;
    //       this.isLoading = false;
    //       if (data.respcd === config.code.OK) {
    //         // this.IsRemit = true

    //         // let uinfo = data.data.userinfo;
    //         // let fees = data.data.fee_ratios
    //         // let qdinfo = data.data.qdinfo;
    //         // let vouchers = data.data.vouchers
    //         // let bankinfo = data.data.bankinfo
    //         this.formData = { ...data.data.base, ...data.data.ext };
    //         this.isBusiness = this.formData.user_type === 3 ? 1 : 0;

    //         // this.formData.status = uinfo.status
    //         // this.formData.sls_uid = qdinfo.sls_uid
    //         // this.formData.vouchers = vouchers
    //         // this.formData.businessaddr = uinfo.businessaddr
    //         // this.formData.shopname = uinfo.shopname; // 商户名称
    //         // this.formData.mode = uinfo.mode; // 商户类型
    //         // this.formData.store_unify_mcc = uinfo.store_unify_mcc
    //         // this.formData.mcc = uinfo.mcc_str
    //         // // this.formData.mcc = +uinfo.mcc; // 行业类别
    //         // this.formData.documentNum = uinfo.idnumber || uinfo.eep || uinfo.passport
    //         // this.formData.address = uinfo.address; //
    //         // this.formData.contact = uinfo.contact
    //         // this.formData.legalperson = uinfo.legalperson; // 联系人姓名
    //         // this.formData.mobile = uinfo.mobile; // 联系电话
    //         // this.formData.email = uinfo.email; // 邮箱地址
    //         // this.formData.br = uinfo.br; // br编号
    //         // this.formData.br_expire_time = uinfo.br_expire_time; // br有效期
    //         // this.formData.ci = uinfo.ci; // ci编号
    //         // this.formData.website = uinfo.website
    //         // this.formData.headbankname = bankinfo.headbankname //
    //         // this.formData.bankProvince = bankinfo.bankProvince //
    //         // this.formData.bankuser = bankinfo.bankuser //
    //         // this.formData.store_iban = bankinfo.store_iban //
    //         // this.formData.store_bic = bankinfo.store_bic //
    //         // this.formData.remit_amt = uinfo.remit_amt
    //         // this.formData.user_type = uinfo.user_type + ''

    //         // if(uinfo.passport) {
    //         //   this.formData.documentType = "passport"
    //         // } else if (uinfo.idnumber) {
    //         //   this.formData.documentType = "idnumber"
    //         // } else {
    //         //   this.formData.documentType = "eep"
    //         // }
    //         // this.mchnt_ratios = fees
    //         // this.getSalesPersonName(this.salesperson); // 匹配树形结构的销售员name
    //       } else {
    //         this.$message.error(data.respmsg);
    //       }
    //     })
    //     .catch(() => {
    //       this.isLoading = false;
    //       this.$message.error(this.$t("common.netError"));
    //     });
    // },
    // getSalesPersonName(list) {
    //   for(let l of list) {
    //     if(l.slsm && l.slsm.length > 0) {
    //       this.getSalesPersonName(l.slsm);
    //     }else {
    //       if(l.uid === this.formData.sls_uid) {
    //         this.formData.slsm_name = l.name;
    //         this.forFlag = true;
    //         return;
    //       }
    //     }
    //     if(this.forFlag) {
    //       return;
    //     }
    //   }
    // },

    checkPeople(n, role, i) {
      if (n.first_name && n.last_name && n.birthday) {
        axios
          .get(`${config.host}/org/v1/mchnt/people`, {
            params: {
              mode: role,
              first_name: n.first_name,
              last_name: n.last_name,
              birthday: n.birthday,
              format: "cors"
            }
          })
          .then(res => {
            let data = res.data;
            let isEmpty = JSON.stringify(data.data) === "{}";
            switch (role) {
              case 2:
                if (data.data.userid && data.data.userid.length) {
                  this.peopleExist1 = true;
                } else {
                  this.peopleExist1 = false;
                }
                break;
              case 3:
                if (isEmpty) {
                  this.peopleExist2[i] = false;
                } else {
                  let beneficial_owner = this.formData.owners[i];
                  ({
                    nation: beneficial_owner.nation,
                    city: beneficial_owner.city,
                    mobile: beneficial_owner.mobile,
                    country: beneficial_owner.country,
                    empeoy_status: beneficial_owner.empeoy_status,
                    address: beneficial_owner.address,
                    post: beneficial_owner.post,
                    email: beneficial_owner.email,
                    vofing: beneficial_owner.vofing,
                    id_type: beneficial_owner.id_type,
                    idnumber: beneficial_owner.idnumber,
                    salutation: beneficial_owner.salutation,
                    title: beneficial_owner.title
                  } = data.data);
                  this.peopleExist2[i] = true;
                }
                this.$forceUpdate();
                break;
              default:
                if (isEmpty) {
                  this.peopleExist3[i] = false;
                } else {
                  let legal_representative = this.formData.legals[i];
                  ({
                    nation: legal_representative.nation,
                    city: legal_representative.city,
                    mobile: legal_representative.mobile,
                    country: legal_representative.country,
                    empeoy_status: legal_representative.empeoy_status,
                    address: legal_representative.address,
                    post: legal_representative.post,
                    email: legal_representative.email,
                    salutation: legal_representative.salutation,
                    title: legal_representative.title
                  } = data.data);
                  this.peopleExist3[i] = true;
                }
                this.$forceUpdate();
            }
          })
          .catch(() => {
            this.$message.error(this.$t("common.netError"));
          });
      }
    },
    confirm() {
      this.$confirm(this.$t("common.sure"), this.$t("common.tip"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning"
      })
        .then(() => {
          this.create();
        })
        .catch(() => {});
    },
    create() {
      // 创建商户的提交
      // let params = {
      //   sls_uid: this.formData.sls_uid, // 业务员id
      //   user_type: this.formData.user_type,
      //   mchnt_type: this.formData.mchnt_type,
      //   address: this.formData.address, // 公司地址
      //   post: this.formData.post,
      //   city: this.formData.city,
      //   country: this.formData.country,
      //   store_shopname: this.formData.store_shopname,
      //   store_expect_amt: this.formData.store_expect_amt,
      //   store_expect_count: this.formData.store_expect_count,
      //   store_post: this.formData.store_post,
      //   store_city: this.formData.store_city,
      //   store_address: this.formData.store_address,
      //   store_country: this.formData.store_country,
      //   address: this.formData.address, // 公司地址
      //   store_iban: this.formData.store_iban,
      //   store_bic: this.formData.store_bic,
      //   store_unify_mcc: this.formData.store_unify_mcc,
      //   website: this.formData.website,
      //   mchnt_ratios: this.mchnt_ratios,
      //   format: "cors"
      // };
      // if (this.formData.user_type === 3) {
      //   ({
      //     business_purpose: params.business_purpose,
      //     mode: params.mode,
      //     foundation_date: params.foundation_date,
      //     sector: params.sector,
      //     // industry: params.industry,
      //     // industry_key: params.industry_key,
      //     name: params.name,
      //     licensenumber: params.licensenumber,
      //     license_name: params.license_name,
      //     owners: params.owners,
      //     legals: params.legals
      //   } = this.formData);
      // } else {
      //   ({
      //     birthday: params.birthday,
      //     email: params.email,
      //     empeoy_status: params.empeoy_status,
      //     first_name: params.first_name,
      //     last_name: params.last_name,
      //     person_mobile: params.person_mobile,
      //     idnumber: params.idnumber,
      //     passport: params.passport,
      //     nation: params.nation
      //   } = this.formData);
      // }

      const params = JSON.parse(JSON.stringify(this.formData));
      if (!this.isBusiness && this.formData.id_type === "idnumber") {
        params.idnumber = this.formData.idnumber;
        delete params.passport;
      } else if (!this.isBusiness && this.formData.id_type === "passport") {
        params.passport = this.formData.idnumber;
        delete params.idnumber;
      }
      delete params.id_type;
      params.mode = this.isBusiness ? 'bigmchnt' : 'mchnt'
      params.mchnt_ratios = this.mchnt_ratios;
      !this.hasInput && delete params.legals;
      let url = this.isUpdate
        ? `${config.host}/org/mchnt/edit`
        : `${config.host}/org/v1/mchnt/signup`;
      // if (this.isUpdate) {
      //   form.type = 'bigmerchant'
      //   form.userid = this.$route.query.userid || getParams('userid')
      //   params.type = 'bigmerchant';
      //   params.userid = this.$route.query.userid || getParams('userid')
      //   delete form.store;
      //   delete params.store
      //   if (!params.first_agent_uid) {
      //     delete params.first_agent_uid
      //   }
      //   if (!params.second_agent_uid) {
      //     delete params.second_agent_uid
      //   }
      // }
      this.isLoading = true;
      axios
        .post(url, JSON.stringify(params), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.isLoading = false;
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.isLoading = false;
            this.$message.success(
              this.isUpdate
                ? this.$t("common.updateSuccess")
                : this.$t("common.createSuccess")
            );
            this.$router.push({
              name: "mchntDetail",
              query: {
                userid: data.data.bigmchnt || data.data.mchnt,
                from: this.isUpdate ? "edit" : "new"
              }
            });
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t("common.netError"));
        });
    },

    next() {
      if (this.mchnt_ratios.length === 0) {
        this.$message.error(
          this.$t("merchant.newMerchant.requiredRule.rule25")
        );
      } else {
        if (this.isBusiness && !this.isVofingAllow) {
          this.$message.error(this.$t("merchant.newMerchant.rule44"));
        } else {
          this.$refs["baseinfo"].validate((valid, object) => {
            if (valid) {
              this.isLoading = true;
              if (this.isUpdate) {
                this.confirm();
              } else {
                // localStorage.setItem('new_baseinfo', JSON.stringify(this.form))
                this.create();
              }
            }
          });
        }
      }
    },

    // next() {
    //   this.create()
    // },

    cancelHandler() {
      this.$router.push({ name: "mchnt_manage_list" });
    },

    // 商户自动入网获取通道pid配置信息
    getPid() {
      axios
        .get(`${config.host}/org/tools/get_pid_info?format=cors`)
        .then(res => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.list = res.data.data;
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.$message.error(this.$t("common.netError"));
        });
    },
    addList() {
      let pid_select = this.formData.pid_select;
      let pid_select_array = [];
      this.mchnt_ratios.forEach(element => {
        pid_select_array.push(element.pid_name);
      });
      this.list.forEach(element => {
        if (pid_select_array.indexOf(pid_select) > -1) {
          this.$message.error(this.$t("common.payTip"));
        } else if (element.pid_name === pid_select) {
          this.mchnt_ratios.push(element);
        }
      });
    },
    pid_name_remove(pid_name) {
      // 支付通道点击减号
      let new_list_select = this.mchnt_ratios.filter(element => {
        return element.pid_name !== pid_name;
      });
      this.mchnt_ratios = new_list_select;
    },
    changeShow(event) {
      if (event.currentTarget.attributes.tag) {
        if (this.formData.owners.length < 4) {
          this.formData.owners.push(JSON.parse(JSON.stringify(this.ownerItem)));
        }
      } else {
        if (this.formData.owners.length > 1) {
          this.formData.owners.pop();
        }
      }
    },
    changeShow2(event) {
      if (event.currentTarget.attributes.tag) {
        if (this.formData.legals.length < 4) {
          this.formData.legals.push(JSON.parse(JSON.stringify(this.legalItem)));
        }
      } else {
        if (this.formData.legals.length > 1) {
          this.formData.legals.pop();
        }
      }
    },
    changeBoard(event) {
      if (!this.isUpdate) {
        if (event.currentTarget.tag === false) {
          this.isBusiness = !this.isBusiness;
          this.$refs["baseinfo"].resetFields();
          this.peopleExist1 = false;
          setTimeout(() => {
            this.mchnt_ratios = [];
          }, 0);
          this.formData.user_type = this.isBusiness ? 3 : 2;
        }
      }
    }
  }
};
</script>
<style lang="scss">
.new-mchnt {
  background-color: #fff;
  padding: 0 30px;
  .up-item {
    margin-top: 10px;
  }
  footer {
    text-align: center;
    padding-bottom: 30px;
  }
  .el-form .no-divider:after {
    background-color: transparent;
  }
  .el-form {
    background-color: #f7f9fa;
    margin-bottom: 24px;
    padding: 15px 0 30px 30px;
    .el-loading-mask {
      width: 300px;
    }
    .sub-account-item-info {
      position: relative;
      #op_type {
        text-align: left;
      }
      .el-input-group__append {
        padding: 0 !important;
        .tree-indic {
          width: 32px;
          height: 30px;
          line-height: 32px;
          display: inline-block;
          text-align: center;
          cursor: pointer;
        }
      }
      .el-input__icon {
        position: absolute;
        width: 35px;
        height: 100%;
        right: 0;
        top: 0;
        text-align: center;
        color: #d9d0bf;
        transition: all 0.3s;
      }
    }

    h3 {
      position: relative;
      padding: 12px 0;
      margin: 0 0 20px;
      font-size: 20px;
      color: #1d1d24;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 50px;
        height: 2px;
        background-color: #232629;
      }
    }
    .title-gap {
      position: relative;
      padding: 12px 0;
      margin: 0 0 20px;
      height: 30px;

      h3 {
        position: absolute;
        font-size: 20px;
        line-height: 20px;
        color: #1d1d24;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 2px;
          background-color: #232629;
        }
      }
      .puls {
        position: absolute;
        right: 10%;
        .el-icon-plus,
        .el-icon-minus {
          &:before {
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }

    h4 {
      position: relative;
      padding: 10px 0;
      margin: 0 0 20px;
      font-size: 20px;
      color: $titleColor;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 50px;
        height: 2px;
        background-color: #232629;
      }
    }
    .el-form-item {
      width: 280px;
      display: inline-block;
      vertical-align: top;
      .el-form-item__content {
        width: 280px;
        .rate_label {
          font-size: 14px;
          color: #717283;
          padding: 0 $smGap;
        }
      }
    }
    .el-form-item.memo {
      width: 940px;
      .el-form-item__content {
        width: 100%;
      }
    }
    .uploader-wrap {
      padding-top: 20px;
      float: left;
      clear: both;
    }
    .upload-label {
      color: grey;
      font-size: 14px;
      height: 204px;
      width: 100%;
      display: flex;
      align-items: center;
    }
    .up-item {
      margin-right: 24px;
      width: 285px;
    }
    .image_info {
      font-size: 14px;
      color: #8a8c92;
      height: 16px;
      line-height: 16px;
      padding: 10px 0;
      text-align: center;
      width: 285px;
      .down-doc {
        color: #fe9b20;
        text-decoration: underline;
        text-decoration-color: #fe9b20;
        font-style: italic;
      }
    }
    .avatar-uploader {
      display: inline-block;
      vertical-align: top;
      margin: 15px 15px 0 0;
    }
    .avatar-wrap {
      position: relative !important;
      .avatar {
        width: 285px;
        height: 214px;
        border: 1px dashed #ccccd5;
        display: block;
      }
      .img-tip {
        width: 285px;
        height: 214px;
        line-height: 214px;
        position: absolute;
        left: 0;
        top: 0;
        color: #ffffff;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        z-index: 9999;
        font-size: 16px;
      }
      &:hover .img-tip {
        display: block;
        /*animation: growUp .5s ease;*/
        -webkit-animation-name: growUp;
        -webkit-animation-duration: 500ms;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-timing-function: ease-in-out;
      }
      @-webkit-keyframes growUp {
        0% {
          height: 0px;
        }
        100% {
          height: 100%;
        }
      }
    }
    .avatar-uploader-wrap {
      width: 285px;
      height: 214px;
      background-color: #f2f2f2;
      text-align: center;
      border: 1px dashed #ccccd5;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      .avatar-uploader-icon {
        width: 50px;
        height: 50px;
        display: inline-block;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        border: 1px dashed #c2c2c2;
        color: #c2c2c2;
        font-size: $bigSize;
      }
      .avatar-desc {
        font-size: $baseSize;
        color: #8a8c92;
        padding-top: $smGap;
      }
      .avatar-tip {
        color: #bdbdbd;
        font-size: $baseSize;
      }
    }
    .payList {
      .width-limit {
        display: inline-flex;
        width: 280px;
        overflow-x: scroll;
        white-space: nowrap;
        scrollbar-width:none;
        &::-webkit-scrollbar { display:none }
      }
      label {
        color: #717283;
      }

      .icon_remove {
        width: $midGap;
        display: inline-block;
        margin-top: 48px;
        .el-icon-remove {
          cursor: pointer;
          font-size: $xgSize;
          color: $baseColor;
          &:hover,
          &:focus {
            color: lighten($baseColor, 10%);
            outline: none;
          }
        }
      }
    }
  }
  .el-tree {
    overflow-x: scroll;
    padding: 5px 12px 5px 5px;
    position: absolute;
    min-width: 100%;
    z-index: 99;
    margin-top: 6px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .top-tabs {
    position: relative;
    height: 100px;
    line-height: 140px;
    color: #717283;
    display: flex;
    justify-content: space-between;
    width: 700px;
    margin: 0 auto;
    hr {
      display: inline-block;
      width: 560px;
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
    }
    .change-btn {
      cursor: pointer;
      position: relative;
      font-size: 14px;
      &:before {
        content: "";
        position: absolute;
        z-index: 1;
        background-color: #fff;
        left: 48px;
        bottom: 40px;
        width: 20px;
        height: 20px;
        border: 1px solid #717283;
        border-radius: 50%;
      }
    }
    .hoverState {
      &:hover {
        font-size: 16px;
        transition: font-size 0.1s;
        &:before {
          width: 25px;
          height: 25px;
          transition: width 0.1s, height 0.1s;
        }
      }
    }
    .isChoose {
      color: #2974ff;
      &:before {
        background-color: #2974ff;
        border-color: #2974ff;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
}
</style>
