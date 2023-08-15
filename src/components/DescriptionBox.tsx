'use client'

import React from 'react'

const DescriptionBox: React.FC = (): JSX.Element => {
  return (
    <div className="hidden lg:block min-h-80vh w-full my-4 dark:text-white rounded-3xl overflow-hidden shadow-2xl">
      <div className="px-6 py-4">
        <div className="text-3xl font-bold mt-3">Tentang Bitcoin</div>
        <div className="mt-3">
          Bitcoin (BTC) adalah sebuah uang elektronik yang dibuat pada tahun
          2009 oleh Satoshi Nakamoto. Nama tersebut juga dikaitkan dengan
          perangkat lunak sumber terbuka yang dia rancang, dan juga menggunakan
          jaringan peer-to-peer tanpa penyimpanan terpusat atau administrator
          tunggal di mana Departemen Keuangan Amerika Serikat menyebut bitcoin
          sebuah mata uang yang terdesentralisasi . Tidak seperti mata uang pada
          umumnya, bitcoin tidak tergantung dengan mempercayai penerbit utama.
          Bitcoin menggunakan sebuah database yang didistribusikan dan menyebar
          ke node-node dari sebuah jaringan P2P ke jurnal transaksi, dan
          menggunakan kriptografi untuk menyediakan fungsi-fungsi keamanan
          dasar, seperti memastikan bahwa bitcoin-bitcoin hanya dapat dihabiskan
          oleh orang memilikinya, dan tidak pernah boleh dilakukan lebih dari
          satu kali.
        </div>
        <div className="mt-3">
          Desain dari Bitcoin memperbolehkan untuk kepemilikan tanpa identitas
          (anonymous) dan pemindahan kekayaan. Bitcoin - bitcoin dapat disimpan
          di komputer pribadi dalam sebuah format file wallet atau di simpan
          oleh sebuah servis wallet pihak ketiga, dan terlepas dari semua itu
          Bitcoin - bitcoin dapat di kirim lewat internet kepada siapapun yang
          mempunyai sebuah alamat Bitcoin. Topologi peer-to-peer bitcoin dan
          kurangnya administrasi tunggal membuatnya tidak mungkin untuk
          otoritas, pemerintahan apapun, untuk memanipulasi nilai dari bitcoin -
          bitcoin atau menyebabkan inflasi dengan memproduksi lebih banyak
          bitcoin.
        </div>
        <div className="mt-3">
          Bitcoin adalah salah satu dari implementasi pertama dari yang disebut
          mata uang kripto, pertama kali dideskripsikan oleh Wei Dai pada tahun
          1998 dalam milis cypherpunks.
        </div>
        <div className="mt-3">
          Bitcoin dan mata uang kripto lainnya, disebut sebagai “aset kripto”,
          kini sudah bisa diperdagangkan di bursa berjangka komoditas Indonesia,
          setelah Badan Pengawas Perdagangan Berjangka Komoditas (Bappebti)
          menerbitkan Peraturan Bappebti No 5 tahun 2019 pada 8 Februari 2019.
          Keberadaan mata uang virtual, seperti halnya bitcoin dan lainnya di
          Indonesia memang sudah mendapat lampu hijau dari Badan Pengawas
          Perdagangan Berjangka Komoditas (Bappebti). Akan tetapi, Bank
          Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) tetap melarang
          penggunaan mata uang kripto sebagai alat pembayaran di Tanah Air. Duit
          digital ini juga bukan merupakan produk industri keuangan. Di
          Indonesia sendiri terdapat beberapa tempat untuk melakukan perdagangan
          bitcoin secara online. Tempat-tempat tersebut sering disebut dengan
          nama Exchange (pertukaran / jual beli). Jumlah perusahaan Crypto
          Exchange di Indonesia cukup banyak dan menawarkan beragam fitur.
        </div>
        <div className="mt-3">
          Bila kita mendaftar pada sebuah platform exchange, maka di dalamnya
          sudah ada wallet Bitcoin yang bisa langsung digunakan. Bitcoin wallet
          dibutuhkan untuk menjaga keamanan aset kripto atau mata uang digital
          yang kita miliki. Karena sebuah wallet pada dasarnya sama seperti
          rekening bank. Di mana bisa melakukan penerimaan, penyimpanan hingga
          pengiriman Bitcoin. Pintu adalah salah satu contohperusahaan Crypto
          Exchange di Indonesia
        </div>
        <div className="mt-3">
          Otoritas berjangka Amerika Serikat, US Commodity Futures Trading
          Commossion (CFTC) menyatakan virtual currency sebagai komoditas pada
          tahun 2014. Sejak itu pula, pengawasan berada di bawah CFTC. Pengawsan
          ini termasuk mengambil tindakan pada bursa futures bitcoin yang tidak
          terdaftar dan menindak manipulasi pasar di platform derivatif. CFTC
          pun menerbitkan panduan pembeda pasar derivatif dan pasar spot untuk
          virtual currency
        </div>
        <div className="mt-3">
          Ruang lingkup pengawasan CFTC hanya berada di pasar berjangka dan
          derivatif. CFTC menerbitkan peringatan soal valuasi dan volatilitas
          pasar virtual currency, serta mengatasi skema Ponzi yang menggunakan
          virtual currency. AS tidak mengawasi secara komprehensif terhadap
          perdagangan bitcoin atau virtual currency lain. Tapi, virtual currency
          menghadapi beberapa aturan dari otoritas. Regulator perbankan
          mengawasi bursa kripto di dalam dan luar negeri lewat peraturan
          transfer uang.
        </div>
      </div>
    </div>
  )
}

export default DescriptionBox
